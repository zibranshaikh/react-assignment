import Validator from '../../utils/formutils/validator';

// For Users form validation
export const _isValid = (field = null, updatedFields) => {
  const validate = Validator.createValidator(
  { 
    firstName: ['required'],
    lastName: ['required'],
    phoneNumber: ['required', 'integer'],
    Address: ['required'],
  },
  {
    firstName: updatedFields['firstName'],
    lastName: updatedFields['lastName'],
    phoneNumber: updatedFields['phoneNumber'],
    Address: updatedFields['Address'],
  },
    field,
  {
    firstName: '', lastName: '', phoneNumber: '', Address: '',
  }
  )
  return validate
}

// Validations on onblur
export const validateOnBlur = (name, fields, setErrors, error) => {
  const { errors } = _isValid(name, fields)
  setErrors({ ...error, [name]: errors[name] })
}
