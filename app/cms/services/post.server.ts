import type { Prisma } from "@prisma/client";
import { DataComponent } from "..";
import { db } from "./db.server";

export type PostModel = {
  title: string
  data: DataComponent[],
  pathname: string
}

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

async function get(id: string): Promise<PostModel | null> {
  const post = await db.post.findUnique({
    where: {
      id,
    },
  });

  if (!post) return null;

  return {
    ...post,
    data: parseData(post.data)
  }
}

async function getByPathname(pathname: string): Promise<PostModel | null> {
  const post = await db.post.findFirst({
    where: {
      pathname,
    },
  });

  if (!post) return null;

  return {
    ...post,
    data: parseData(post.data)
  }
}

function parseData(data: Prisma.JsonValue): DataComponent[] {
  if (!data?.toString()) throw new Error("Prisma returned null data");
  return JSON.parse(data.toString())
}

const postService = {
  create,
  update,
  get,
  getByPathname
}
export default postService