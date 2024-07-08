import prisma from "../../../../lib/prisma";
import { createTransport } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const { email } = await req.json();

  console.log("Received email:", email); // Log received email

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found for email:", email); // Log user not found
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    console.log("Updated user with reset token:", resetToken); // Log token creation

    const transporter = createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset",
      text: `
        You have requested a password reset. Click the link below to reset your password:
        ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}
        
        If you did not request this, please ignore this email.
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error) {
          console.error("Error sending email:", error); // Log email sending error
          reject(new Error("Something went wrong"));
        } else {
          console.log("Email sent successfully:", emailResponse); // Log successful email
          resolve();
        }
      });
    });

    return new Response(
      JSON.stringify({ message: "Password reset email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in password reset process:", error); // Log overall process error
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
