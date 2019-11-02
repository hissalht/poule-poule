import yup from 'yup'

export const postLobbySchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().min(3)
})
