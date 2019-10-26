import yup from 'yup'

export const postLobbySchema = yup.object().shape({
  name: yup.string().required()
})

