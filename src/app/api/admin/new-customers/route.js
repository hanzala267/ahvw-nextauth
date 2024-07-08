// // pages/api/admin/users.js
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
// import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isApproved: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/admin/approve-user/[id].js
// import prisma from '../../../../lib/prisma'
// import { getSession } from 'next-auth/react'

// export async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session || session.user.role !== "admin") {
//     return res.status(403).json({ error: "Forbidden" });
//   }

//   const { id } = req.query;

//   if (req.method === "PUT") {
//     try {
//       const { isApproved } = req.body;
//       const updatedUser = await prisma.user.update({
//         where: { id },
//         data: { isApproved },
//       });
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       console.error("Error updating user:", error);
//       res.status(500).json({ error: "Failed to update user" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
