import Joi from 'joi'

export default Joi.object({
  id: Joi.number(),
  name: Joi.string().max(50).min(2),
})