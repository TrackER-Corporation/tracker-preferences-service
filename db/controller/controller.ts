import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { collections } from '../services/database.service';
const ObjectId = require("mongodb").ObjectId;


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getPreferenceById = asyncHandler(async (req, res) => {
    const goal = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if(!goal){
        res.status(404)
        return
    }
    res.status(200).json({goal})
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const createPreference = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        return
    }
    const preference = await collections?.preference?.insertOne({
        activityLog: true,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        userId: new ObjectId(req.params.id),
        notification: true,
        news: false
    })

    res.status(200).json(preference)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updatePreference = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        return
    }
    const preference = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (!preference) {
        res.status(401)
        return
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
        return
    }
    const goal = await collections?.preference?.findOne({ userId: new ObjectId(req.params.id) })
    if (!goal) {
        res.status(401)
        return
    }

    res.status(200).json(goal.avatar)
})
