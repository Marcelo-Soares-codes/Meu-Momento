import * as yup from "yup";

export const arenaValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
