import type { Post } from "@prisma/client";
import { db } from "./db.server";

export type PostModel = Post

interface PostCreate {
  title: string,
  data: string,
  pathname: string
}
type PostUpdate = Partial<PostCreate>

function create(data: PostCreate) {
  return db.post.create({
    data: {
      title: data.title,
      data: data.data,
      pathname: data.pathname
    },
  });
}

function update(id: string, data: PostUpdate) {
  return db.post.update({
    where: {
      id: id
    },
    data: {
      title: data.title,
      data: data.data,
      pathname: data.pathname
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

function getByPathname(pathname: string) {
  return db.post.findFirst({
    where: {
      pathname,
    },
  });
}

const postService = {
  create,
  update,
  get,
  getByPathname
}
export default postService