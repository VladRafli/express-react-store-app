import { Router } from 'express'
import loginController from '../../../app/controller/auth/loginController'
import registerController from '../../../app/controller/auth/registerController'

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)

export default router