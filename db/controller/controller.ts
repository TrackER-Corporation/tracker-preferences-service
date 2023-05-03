import asyncHandler from 'express-async-handler';
import { collections } from '../services/database.service';
import { ObjectId } from 'mongodb';

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getPreferenceById = asyncHandler(async (req, res, next) => {
    const goal = await collections.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (!goal) {
        res.status(404)
        throw Error('Not found')
    }
    res.status(200).json({ goal })
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const createPreference = asyncHandler(async (req, res) => {
    if (req.params.id === null || !req.params.id) {
        res.status(400)
        throw Error('Not found')
    }
    const preference = await collections?.preference?.insertOne({
        userId: new ObjectId(req.params.id),
        activityLog: true,
        notification: true,
        news: false,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
    })
    if (preference) {
        res.status(200).json(preference)
    }
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updatePreference = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw Error('Not found')
    }
    const preference = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (!preference) {
        res.status(401)
        throw Error('Not found')
    }
    const update = await collections?.preference?.findOneAndUpdate(
        { userId: new ObjectId(req.params.id) },
        { $set: { ...req.body } },
        { returnDocument: 'after' }
    )
    res.status(200).json(update)
})

export const getAvatarById = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw Error('Not found')
    }
    const goal = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (!goal) {
        res.status(401)
        throw Error('Not found')
    }

    res.status(200).json(goal.avatar)
})

export const deleteAvatarByUserId = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw Error('Not found')
    }
    const goal = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (goal === null) {
        res.status(401)
    } else {
        await collections.preference?.deleteOne({ userId: new ObjectId(req.params.id) })
        res.status(200).json(goal)
    }
})

