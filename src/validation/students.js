import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers and may start with +',
      'any.required': 'Phone number is required',
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

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?\d+$/)
    .optional()
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers and may start with +',
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
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });
