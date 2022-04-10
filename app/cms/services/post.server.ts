import type { Post } from "@prisma/client";
import { db } from "./db.server";

export type PostModel = Post

function create(title: string, components: string) {
  return db.post.create({
    data: {
      title,
      data: components,
    },
  });
}

function update(id: string, title: string, components: string) {
  return db.post.update({
    where: {
      id: id
    },
    data: {
      title,
      data: components,
    },
  });
}

function get(id: string) {
  return db.post.findUnique({
    where: {
      id,
    },
  });
}

const postService = {
  create,
  update,
  get,
}
export default postService