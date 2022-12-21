import Joi from 'joi'

export default Joi.object({
    skip: Joi.number(),
    take: Joi.number()
})
