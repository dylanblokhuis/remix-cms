import type { Post, PostType, User } from "@prisma/client";
import { db } from "./db.server";

export type PostTypeModel = PostType
export type PostTypeModelWithPosts = (PostType & {
  posts: (Post & {
    author: User;
  })[];
})

interface PostTypeCreate {
  singular: string
  plural: string
  pathname: string
}
type PostTypeUpdate = Partial<PostTypeCreate>

function create(data: PostTypeCreate) {
  return db.postType.create({
    data: data,
  });
}

function update(id: string, data: PostTypeUpdate) {
  return db.postType.update({
    where: {
      id: id
    },
    data: data,
  });
}

async function get(id: string): Promise<PostTypeModel | null> {
  const postType = await db.postType.findUnique({
    where: {
      id,
    },
  });

  if (!postType) return null;
  return postType
}


async function getWithPosts(id: string) {
  const postType = await db.postType.findUnique({
    where: {
      id,
    },
    include: {
      posts: {
        include: {
          author: true
        }
      }
    }
  });

  if (!postType) return null;
  return postType
}

function getAll(): Promise<PostTypeModel[]> {
  return db.postType.findMany()
}

const postTypeService = {
  create,
  update,
  get,
  getAll,
  getWithPosts
}
export default postTypeService