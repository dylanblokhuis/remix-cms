import { PrismaClient } from "@prisma/client"
import { genSalt, hash } from "bcrypt"

async function main() {
  const db = new PrismaClient();

  const salt = await genSalt(10);
  const passwordHash = await hash("admin", salt);
  await db.user.create({
    data: {
      email: "info@example.org",
      name: "admin",
      password: passwordHash,
    }
  })

  await db.postType.createMany({
    data: [
      {
        singular: "Post",
        plural: "Posts",
        pathname: "/",
      },
      {
        singular: "Page",
        plural: "Pages",
        pathname: "/",
      }
    ]
  });
}

main()