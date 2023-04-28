import express from 'express'
const router = express.Router()
import { createPreference, updatePreference, getPreferenceById, getAvatarById } from '../controller/controller'

router.post('/api/preference/:id', createPreference)
router.put('/api/preference/:id', updatePreference)
router.get('/api/preference/:id', getPreferenceById)
router.get('/api/preference/avatar/:id', getAvatarById)

export default router