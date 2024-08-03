export function handleValidationUpdateTopic(editData, errors) {
  if (editData.editSubjectId == 'Chọn môn học') {
    errors.editSubjectId = 'Môn học không được để trống'
  }
  if (editData.editTopicType == 'Chọn loại topic') {
    errors.editTopicType = 'Loại topic không được để trống'
  } else if (editData.editGrade != '1') {
    if (editData.editDuration == 'Chọn thời gian') {
      errors.editDuration = 'Thời gian không được để trống'
    }
  }

  if (editData.editGrade == 'Chọn lớp') {
    errors.editGrade = 'Lớp học không được để trống'
  }
  if (
    editData.editTopicName == '' ||
    editData.editTopicName == ' ' ||
    editData.editTopicName == null
  ) {
    errors.editTopicName = 'Tên topic không được để trống'
  }

  if (editData.editTopicType == 6) {
    if (
      editData.editStartDate == '' ||
      editData.editStartDate == null ||
      editData.editStartDate == '' ||
      editData.editStartDate == null
    ) {
      errors.editStartDate =
        'Ngày bắt đầu hoặc ngày kết thúc không được để trống'
    }
  }
}
export function handleValidationCreateTopic(createData, errors) {
  if (createData.createSubjectId == 'Chọn môn học') {
    errors.createSubjectId = 'Môn học không được để trống'
  }
  if (createData.createTopicType == 'Chọn loại topic') {
    errors.createTopicType = 'Loại topic không được để trống'
  } else if (createData.createTopicType != '1') {
    if (createData.createDuration == 'Chọn thời gian') {
      errors.createDuration = 'Thời gian không được để trống'
    }
  }
  if (createData.createTopicType == 6) {
    if (
      createData.createEndDate == '' ||
      createData.createEndDate == null ||
      createData.createStartDate == '' ||
      createData.createStartDate == null
    ) {
      errors.createStartDate =
        'Ngày bắt đầu hoặc ngày kết thúc không được để trống'
    }
  }
  if (createData.createTopicType != 5 && createData.createTopicType != 6) {
    if (createData.createGrade == 'Chọn lớp') {
      errors.createGrade = 'Lớp học không được để trống'
    }
  }
  if (
    createData.createTopicName == '' ||
    createData.createTopicName == ' ' ||
    createData.createTopicName == null
  ) {
    errors.createTopicName = 'Tên topic không được để trống'
  }
}
export function handleValidationUpdateUser(editData, errors, phoneList) {
  if (
    editData.editFullName == '' ||
    editData.editFullName == null ||
    editData.editFullName == ' '
  ) {
    errors.editFullName = 'Tên không được để trống'
  }
  if (!/^[\p{L}\s]+$/u.test(editData.editFullName)) {
    errors.editFullName = 'Tên không chứa kí tự đặc biệt'
  }

  if (
    !/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(
      editData.editPhone
    )
  ) {
    errors.editPhone = 'Số điện thoại phải 10 chữ số'
  }
  if (
    editData.editPhone == '' ||
    editData.editPhone == null ||
    editData.editPhone == ' '
  ) {
    errors.editPhone = 'Số điện thoại không được để trống'
  }
  if (phoneList?.includes(editData.editPhone)) {
    errors.editPhone = 'Số điện thoại đã được đăng ký'
  }

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const current = `${year}-${month}-${day}`

  if (editData.editBirthDay > current == true) {
    errors.editBirthDay = 'Ngày sinh phải nhỏ hơn ngày hiện tại'
  }
}
export function handleValidationChangePassword(newPassword, errors) {
  if (
    newPassword.inputNewPassword == '' ||
    newPassword.inputNewPassword == null ||
    newPassword.inputNewPassword == ' '
  ) {
    errors.inputNewPassword = 'Không được để trống'
  } else {
    if (newPassword.inputNewPassword.length >= 6) {
      if (!/[A-Z]/.test(newPassword.inputNewPassword.charAt(0))) {
        errors.inputNewPassword = 'Mật khẩu phải bắt đầu bằng chữ hoa'
      } else if (
        !/[a-zA-Z]/.test(newPassword.inputNewPassword) ||
        !/[0-9]/.test(newPassword.inputNewPassword)
      ) {
        errors.inputNewPassword = 'Mật khẩu phải chứa chữ và số'
      } else if (
        newPassword.inputComfirmPassword == '' ||
        newPassword.inputComfirmPassword == null ||
        newPassword.inputComfirmPassword == ' '
      ) {
        errors.inputComfirmPassword = 'Không được để trống'
      } else if (
        newPassword.inputNewPassword != newPassword.inputComfirmPassword
      ) {
        errors.inputComfirmPassword = 'Mật khẩu và xác thực mật khẩu không khớp'
      }
    } else {
      errors.inputNewPassword = 'Độ dài mật khải phải trên 6'
    }
  }
}
export function handleValidationCreateNew(createData, errors, imageUpload) {
  if (createData.createCategory == 'Chọn loại') {
    errors.createCategory = 'Loại tin tức không được để trống'
  }
  if (imageUpload == null) {
    errors.createImage = 'Ảnh bìa không được để trống'
  }
  if (
    createData.createTitle == null ||
    createData.createTitle == '' ||
    createData.createTitle == ' '
  ) {
    errors.createTitle = 'Tiêu đề không được để trống'
  }
  if (
    createData.createSubTitle == null ||
    createData.createSubTitle == '' ||
    createData.createSubTitle == ' '
  ) {
    errors.createSubTitle = 'Tiêu đề phụ không được để trống'
  }
  if (
    createData.createContent == null ||
    createData.createContent == '' ||
    createData.createContent == ' '
  ) {
    errors.createContent = 'Nội dung không được để trống'
  }
}
export function handleValidationEditNew(editData, errors, imageUpload) {
  if (editData.editCategory == 'Chọn loại') {
    errors.editCategory = 'Loại tin tức không được để trống'
  }
  if (imageUpload == null) {
    errors.editImage = 'Ảnh bìa không được để trống'
  }
  if (
    editData.editTitle == null ||
    editData.editTitle == '' ||
    editData.editTitle == ' '
  ) {
    errors.editTitle = 'Tiêu đề không được để trống'
  }
  if (
    editData.editSubTitle == null ||
    editData.editSubTitle == '' ||
    editData.editSubTitle == ' '
  ) {
    errors.createSubTitle = 'Tiêu đề phụ không được để trống'
  }
  if (
    editData.editContent == null ||
    editData.editContent == '' ||
    editData.editContent == ' '
  ) {
    errors.editContent = 'Nội dung không được để trống'
  }
}
