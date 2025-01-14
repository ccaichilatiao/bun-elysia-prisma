import { NotFoundError } from "elysia";
import db from "../../db";

export const getPosts = async () => {
  try {
    return await db.post.findMany({ orderBy: { createdAt: "asc" } });
  } catch (e: unknown) {
    console.log(`Error getting posts: ${e}`);
  }
};

export const getPost = async (id: number) => {
  try {
    const post = await db.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  } catch (e: unknown) {
    console.log(`Error finding post: ${e}`);
  }
};

export const updatePost = async (
  id: number,
  options: { title?: string; content?: string }
) => {
  try {
    const { title, content } = options;
    return await db.post.update({
      where: { id },
      data: { ...(title ? { title } : {}), ...(content ? { content } : {}) },
    });
  } catch (e: unknown) {
    console.log(`Error creating post: ${e}`);
  }
};

export const deletePost = async (options: { id: number }) => {
  try {
    const { id } = options;
    return await db.post.delete({ where: { id } });
  } catch (e: unknown) {
    console.log(`Error deleting post: ${e}`);
  }
};

export const createPost = async (options: {
  title: string;
  content: string;
}) => {
  try {
    const { title, content } = options;
    return await db.post.create({ data: { title, content } });
  } catch (e: unknown) {
    console.log(`Error creating post: ${e}`);
  }
};
