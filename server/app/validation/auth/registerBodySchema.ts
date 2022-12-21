import Joi from 'joi'

export default Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?& ]/).required(),
    repeatPassword: Joi.string().min(8).required(),
})
