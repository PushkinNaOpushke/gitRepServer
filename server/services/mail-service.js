const nodemailer = require("nodemailer");

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_MAIL_SERVICE,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL_EMAIL,
                pass: process.env.SMTP_MAIL_PASSWORD,}
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_MAIL_EMAIL,
            to,
            subject: 'Verify your Email on ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                <h1>Follow the link:</h1>
                <a href="${link}">${link}</a>
                </div>
                `
        })
    }
}

module.exports = new MailService()