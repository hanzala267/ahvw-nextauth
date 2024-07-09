import prisma from "../../../../lib/prisma";
import { createTransport } from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const { email } = await req.json();

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
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

    const transporter = createTransport({
      service: "gmail",
      secure: true,
      port: 587,
      auth: {
        user: "mhanzala267@gmail.com",
        pass: "byjuetuwkqkpkiru",
      },
    });

    const mailOptions = {
      from: "mhanzala267@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: `
        You have requested a password reset. Click the link below to reset your password:
        ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}
        
        If you did not request this, please ignore this email.
      `,
    };

    await transporter.sendMail(mailOptions, (error, emailResponse) => {
      if (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      console.log("Email sent successfully:", emailResponse);
    });

    return new Response(
      JSON.stringify({ message: "Password reset email sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
