import express from 'express'
const router = express.Router()
import { createPreference, updatePreference, getPreferenceById, getAvatarById, deleteAvatarByUserId } from '../controller/controller'

router.post('/:id', createPreference)
router.put('/:id', updatePreference)
router.get('/:id', getPreferenceById)
router.get('/avatar/:id', getAvatarById)
router.delete('/:id', deleteAvatarByUserId)

export default router