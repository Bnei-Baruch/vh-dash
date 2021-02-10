/**
 * definition of possible validation methods
 */

//Possible fieldTypes that can be validated,
//implementation is in instructions object
const fieldTypes = {
  username: 'username',
  firstname: 'firstname',
  lastname: 'lastname',
  dob: 'dob',
  fullname: 'fullname',
  email: 'email',
  phone: 'phone',
  password: 'password',
  question: 'question',
};

const emailRex = /^[\w-']+(\.[\w-']+)*@([a-zA-Z0-9]+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
const validEmail = field => !!field.toString().match(emailRex);
const usernameRegex = field =>
  //allow only alpha numerical characters
  !!field.toString().match(/^[a-zA-Z0-9_]+$/);

const methods = {
  nonZeroLength: field => field && field.length > 0,
  validEmail,
  usernameRegex,
  lengthToBe: (field, number) => number.includes(field.length),
  lengthLessThan: (field, number) => field.length < parseInt(number),
  lengthGreaterThan: (field, number) => field.length > parseInt(number),
  numbersOnly: field => !!field.toString().match(/^[0-9]+$/),
  nonZeroLengthDateOfBirth: field => {
    let toReturn = true;
    field.split('/').forEach(element => {
      //check if every element of date is > 0
      if (element.length <= 0) {
        toReturn = false;
      }
    });
    return toReturn;
  },
  numbersOnlyDateOfBirth: field => {
    let toReturn = true;

    if (typeof field !== 'string') {
      return false;
    }

    field.split('/').forEach(element => {
      //check if every element of date is > 0
      if (!element.toString().match(/^\d+$/)) {
        toReturn = false;
      }
    });
    return toReturn;
  },
  /**
   * @param {Date} - date in dd/mm/yyyy format
   */
  laterThen1900: field => parseInt(field.split('/')[0]) >= 1900,
  password: field => {
    const hasLowerCase = /[a-z]+/g.test(field);
    const hasCapital = /[A-Z]+/g.test(field);
    const hasNumber = /\d+/g.test(field);
    const hasSpecialCharacter = /[^a-zA-Z\d]/g.test(field);
    return (
      field.length >= 8 &&
      field.length <= 100 &&
      hasLowerCase &&
      hasCapital &&
      hasNumber &&
      !hasSpecialCharacter
    );
  },
  /**
   * @param field {string} - input text
   * @returns {boolean} check if string alpha numerical
   */
  namesRegex: field =>
    //allow letters, hyphen, apostrophe, full stop and space
    field.toString().match(/^[^-\s][a-zA-Z-.'](?!.*\s{2})[\s\w.-]{0,}$/),
  onlyLettersRegex: field =>
    //allow only letters
    field.match(/^[a-zA-Z]+$/),
};

/**
 * Object containing instructions about how a particular type of a field should be validated
 * and what errorMessage should be pushed when it fails
 */
const instructions = {
  [fieldTypes.firstname]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your first name',
      break: true,
    },
    {
      validationMethod: methods.lengthGreaterThan,
      param: 2,
      errorMsg: 'First name should be more than 2 symbols',
      break: true,
    },
    {
      validationMethod: methods.usernameRegex,
      errorMsg: 'First name must only contain letters, spaces, hyphens, apostrophes or full stop symbols',
    },
  ],
  [fieldTypes.lastname]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your last name',
      break: true,
    },
    {
      validationMethod: methods.lengthGreaterThan,
      param: 2,
      errorMsg: 'Last name should be more than 2 symbols',
      break: true,
    },
    {
      validationMethod: methods.usernameRegex,
      errorMsg: 'Last name must only contain letters, spaces, hyphens, apostrophes or full stop symbols',
    },
  ],
  [fieldTypes.fullname]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your full name in primary language',
      break: true,
    },
    {
      validationMethod: methods.lengthGreaterThan,
      param: 2,
      errorMsg: 'Full name should be more than 2 symbols',
      break: true,
    },
    {
      validationMethod: methods.usernameRegex,
      errorMsg: 'Full name must only contain letters, spaces, hyphens, apostrophes or full stop symbols',
    },
  ],
  [fieldTypes.email]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your email',
      break: true,
    },
    {
      validationMethod: methods.validEmail,
      errorMsg: 'You must enter a valid email address',
    },
  ],
  [fieldTypes.phone]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your phone number',
      break: true,
    },
    {
      validationMethod: methods.lengthToBe,
      param: [10, 11, 12],
      errorMsg: 'Mobile number should be 10, 11, 12 numbers length',
      break: true,
    },
    {
      validationMethod: methods.numbersOnly,
      errorMsg: 'Phone number must contain only numbers',
      break: true,
    },
  ],
  [fieldTypes.password]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your password',
      break: true,
    },
    {
      validationMethod: methods.password,
      errorMsg:
        'Minimum 8 characters in length, 1 lower case letter, 1 upper case letter, 1 number.',
    },
  ],
  [fieldTypes.dob]: [
    {
      validationMethod: methods.nonZeroLengthDateOfBirth,
      errorMsg: 'Please choose your date of birth',
      break: true,
    },
    {
      validationMethod: methods.laterThen1900,
      errorMsg: 'You cannot enter a year earlier than 1900',
    },
  ],
  [fieldTypes.question]: [
    {
      validationMethod: methods.nonZeroLength,
      errorMsg: 'Please enter your question',
      break: true,
    },
  ],
};

/**
 *
 * @param {string} fieldType - type of the field that is validated,
 * only fields that are in instructions object are allowed
 * @param {*} value - value of input field that we want to validate
 * @param {*} errorMsgType - for different journeys we might want to display a different msg
 * check instructions object
 * @returns {array} array of strings, containing errors, empty array if no errors
 */
// eslint-disable-next-line complexity
const validateField = (fieldType, value, errorMsgType = 'errorMsg') => {
  //set of instructions for this type
  const validationInstructions = instructions[fieldType];
  const errors = [];

  //object to hold the error messages we already added,
  //sometimes for some rules we want to add the same error
  //i.e username to be greater then 4 lesser than 15 will have the same error
  //but will use 2 validation methods
  const duplicateHolder = {};

  for (let index = 0; index < validationInstructions.length; index++) {
    const currentInstruction = validationInstructions[index];

    if (
      //check if fails validation
      !currentInstruction.validationMethod(value, currentInstruction.param) &&
      //check if we already have the error
      !duplicateHolder[currentInstruction[errorMsgType]]
    ) {
      duplicateHolder[currentInstruction[errorMsgType]] = true;
      // eslint-disable-next-line max-depth
      if (!currentInstruction.stopValidation) {
        // Set default error if instructions don't have errors
        errors.push(
          currentInstruction[errorMsgType] || `Please input valid ${fieldType}`,
        );
      }
      //sometimes we want to break the validation
      //i.e there is no point of launching regexp if field is empty

      //when flag stopValidation is true
      //that means we dont want to throw error
      //and we don't want to validate

      // eslint-disable-next-line max-depth
      if (currentInstruction.break || currentInstruction.stopValidation) {
        break;
      }
    }
  }
  return errors;
};

/**
 *
 * @param {object} object containing arrays with error strings
 * @returns {bool} true if any error exists, false otherwise
 */
const fieldsetHasErrors = errorObject => {
  let hasErrors = false;
  Object.keys(errorObject).forEach(key => {
    const errorArray = errorObject[key];
    if (errorArray.length > 0) {
      hasErrors = true;
    }
  });
  return hasErrors;
};

/**
 *
 * @param {object} object containing arrays with value strings
 */
const fieldsetHasValues = valueObject =>
  Object.keys(valueObject).every(item => valueObject[item]);

/**
 * @param {object} errorFields - errorFields object
 * @param {string} errorFieldsKey - key of the object in errorFields to extend
 * @param {string} fieldType - type of the field, defined in fieldTypes
 * @param {array} value
 * @returns {object} errorFields
 */
// eslint-disable-next-line max-params
const extendErrorFields = (errorFields, errorFieldsKey, fieldType, value) => {
  errorFields = Object.assign(errorFields, {
    [errorFieldsKey]: validateField(fieldType, value),
  });
  return errorFields;
};

const validator = {
  validateField,
  fieldsetHasErrors,
  methods,
  fieldTypes,
  extendErrorFields,
  fieldsetHasValues,
};

export default validator;
