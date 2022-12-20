import { Router } from 'express'
import loginController from '../../../app/controller/auth/loginController'

const router = Router()

router.post('/login', loginController)

export default router