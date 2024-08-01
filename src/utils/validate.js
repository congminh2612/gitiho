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
