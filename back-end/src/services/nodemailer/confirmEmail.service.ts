import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configurações do serviço de e-mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

// Função para enviar e-mail de confirmação
export const sendConfirmationEmail = async (
  email: string,
  confirmationToken: string
) => {
  try {
    // Template de e-mail de confirmação
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #FCFFFC; padding: 20px;">
        <h1 style="color: #040F0F;">Confirmação de E-mail</h1>
        <p style="color: #2BA84A;">Por favor, clique no link abaixo para confirmar seu e-mail:</p>
        <p style="color: #2BA84A;">Token: ${confirmationToken}</p>
        <a href="${process.env.URL_FRONTEND}/confirm-create/${confirmationToken}" style="margin: auto; background-color: #248232; color: #FCFFFC; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Confirmar E-mail</a>
      </div>
    `;

    // Opções de e-mail
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Confirmação de E-mail",
      html: emailTemplate,
    };

    // Enviar e-mail
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
    throw new Error("Erro ao enviar e-mail de confirmação");
  }
};
