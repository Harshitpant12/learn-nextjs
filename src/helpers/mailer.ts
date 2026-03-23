import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

const sendEmail = async ({email, emailType, userId} : any) => {
    try {
        // create a hashed token using bcryptjs
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 // 1 hour
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const mailOptions = {
            from: 'harshpant778@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Account' : 'Reset Your Password',
            html: `<p>Click <a href="${process.env.CLIENT_URL}/auth/${emailType.toLowerCase()}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your account' : 'reset your password'}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;

    } catch (error : any) {
        throw new Error(error.message);
    }
}