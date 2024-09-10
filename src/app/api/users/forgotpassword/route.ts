import nodemailer from 'nodemailer';
import User from "@/models/userModel"; 
import bcryptjs from 'bcryptjs';

export const forgotPassword = async (req: any, res: any) => {
    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = await bcryptjs.hash(user._id.toString(), 10);

        // Update the user with the reset token and expiry time
        user.forgotPasswordToken = resetToken;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000; 
        await user.save();

        // Create Nodemailer transport
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT as string, 10),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // Email content
        const mailOptions = {
            from: 'josephmuhindo089@gmail.com',
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${resetToken}">here</a> to reset your password or copy and paste the link below into your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${resetToken}</p>`
        };

        // Send email
        await transport.sendMail(mailOptions);
        res.status(200).json({ message: 'Reset email sent successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
