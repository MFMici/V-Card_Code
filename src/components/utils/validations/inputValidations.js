import User from '@/request/User.js'

export const validateInput = async (fieldName, value, isNew) => {

  const validationMessages = [];
  const validCodes = ['code1', 'code2', 'code3', 'code4'];


  if (value === '') {
    return {
      messages: ['This field is required'],
      isValid: false,
    }
  }

  if (fieldName === 'phone') {

    if (value[0] !== '9' || (value[1] !== '1' && value[1] !== '3' && value[1] !== '6' && value[1] !== '2')) {
      return {
        messages: ['Invalid Portuguese phone number'],
        isValid: false,
      }

    } 
    
    if (!value.match(/^\+?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/)) {
      return {
        messages: ['Invalid phone number, it should contain 9 digits'],
        isValid: false,
      }
    }

    if (isNew) {
      const response = await User.findBy('email', value.replace(/\s/g, '') + '@gmail.com');
      if (response.length > 0) {
        return {
          messages: ['Phone number already exists'],
          isValid: false,
        }
      }
    }
  }

  if (fieldName === 'password') {
    if (value.length < 8) {
      validationMessages.push('Password must be at least 8 characters long');
    }

    if (!value.match(/[a-z]/)) {
      validationMessages.push('Password must contain at least one lowercase letter');
    }

    if (!value.match(/[A-Z]/)) {
      validationMessages.push('Password must contain at least one uppercase letter');
    }

    if (!value.match(/[0-9]/)) {
      validationMessages.push('Password must contain at least one number');
    }

    if (!value.match(/[^a-zA-Z0-9]/)) {
      validationMessages.push('Password must contain at least one special character');
    }
  }

  if (validCodes.includes(fieldName)) {
    if(value.length !== 1){
      return {
        messages: ['This field must be only one character long'],
        isValid: false,
      }
    }

    if(!value.match(/[0-9]/)){
      return {
        messages: ['This field must be a number'],
        isValid: false,
      }
    }
  }

  return {
    messages: validationMessages,
    isValid: validationMessages.length === 0,
  };
};
