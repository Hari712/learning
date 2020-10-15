import { EMAIL_VALIDATION_REGEX } from '../constants/AppConstants'

export const validateEmailorPhoneNumber = (input) => {
    const re = EMAIL_VALIDATION_REGEX
    return re.test(input)
}