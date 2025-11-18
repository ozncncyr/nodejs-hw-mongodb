import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
  email: Joi.string().email().optional().allow(null).messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('personal', 'home', 'work', 'other')
    .optional()
    .messages({
      'any.only': 'Contact type must be one of personal, home, work, or other',
    }),
});
