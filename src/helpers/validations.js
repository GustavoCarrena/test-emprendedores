import * as yup from 'yup'

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .email('Formato de correo electrónico no válido')
    .required('(Campo obligatorio)'),
  username: yup
    .string()
    .required('(Campo obligatorio)')
    .matches(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El Nombre y Apellido no puede contener números ni caracteres especiales'
    ),
})
