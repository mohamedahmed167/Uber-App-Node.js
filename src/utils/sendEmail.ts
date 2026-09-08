import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (option: EmailOptions) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transport.verify();

    const mailOptions = {
      from: `"RYVO APP" <${process.env.SMTP_USER}>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
    };

    await transport.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error in SMTP");
  }
};

export default sendEmail;
