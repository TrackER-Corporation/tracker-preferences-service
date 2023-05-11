import express from 'express'
const router = express.Router()
import { createPreference, updatePreference, getPreferenceById, getAvatarById, deleteAvatarByUserId } from '../controller/controller'

router.get('/:id', getPreferenceById)
router.get('/avatar/:id', getAvatarById)
router.put('/:id', updatePreference)
router.post('/:id', createPreference)
router.delete('/:id', deleteAvatarByUserId)

export default router