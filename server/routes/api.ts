import { Router } from 'express'
import authRouter from './api/auth/auth'

const router = Router({ mergeParams: true })

router.use('/auth', authRouter)

export default router