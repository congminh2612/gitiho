export const validateRegister = (
  emailList,
  phoneList,
  registerData,
  errors
) => {
  if (emailList.includes(registerData.email)) {
    errors.email = 'Email đã được đăng ký'
  }
  if (phoneList.includes(registerData.phoneNumber)) {
    errors.phoneNumber = 'Email đã được đăng ký'
  }
}
