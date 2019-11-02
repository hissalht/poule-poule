import yup from 'yup'

export const postLobbySchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().min(3)
})

export const postUserSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required()
})
