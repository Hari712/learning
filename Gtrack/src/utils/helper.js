import { EMAIL_PHONE_REGEX } from '../constants/AppConstants'

export const validateEmailorPhoneNumber = (input) => {
    const re = EMAIL_PHONE_REGEX
    return re.test(input)
}