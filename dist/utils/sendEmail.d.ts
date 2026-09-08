interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}
declare const sendEmail: (option: EmailOptions) => Promise<void>;
export default sendEmail;
//# sourceMappingURL=sendEmail.d.ts.map