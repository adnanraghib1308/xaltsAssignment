import { prisma } from "./utils";

export const getUserByEmail = async (email: string) => (await prisma.user.findFirst({ where: { email }}))
export const getUserById = async (id: number) => (await prisma.user.findFirst({ where: { id }}))
export const getAllUsers = async () => (await prisma.user.findMany({}))