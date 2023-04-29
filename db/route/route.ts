import express from 'express'
const router = express.Router()
import { createPreference, updatePreference, getPreferenceById, getAvatarById } from '../controller/controller'

router.post('/:id', createPreference)
router.put('/:id', updatePreference)
router.get('/:id', getPreferenceById)
router.get('/avatar/:id', getAvatarById)

export default router