import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (option: EmailOptions) => {
  try {
    console.log("HOST_EMAIL =", process.env.HOST_EMAIL);
    console.log("EMAIL_PORT =", process.env.EMAIL_PORT);
    console.log("EMAIL =", process.env.SMTP_USER);
    const transport = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transport.verify();

    await transport.sendMail({
      from: `"RYVO APP" <${process.env.SMTP_USER}>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("SMTP ERROR:", error);
    throw error;
  }
};

export default sendEmail;
