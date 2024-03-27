import * as yup from "yup";

export const userValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  phone: yup.string().nullable(),
});

export const recoverPasswordValidation = yup.object({
  email: yup.string().required().email(),
  newPassword: yup.string().required().min(8),
});
