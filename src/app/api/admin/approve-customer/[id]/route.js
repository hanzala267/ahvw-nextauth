import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "../../../../../../lib/prisma"; // Adjust this import path as needed

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id } = params;
  const { isApproved } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isApproved },
    });
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
