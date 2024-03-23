import { UserDTO } from "../DTOs/user.dto";
import { prisma } from "../services/prisma";

export const createUser = async (data: UserDTO) => {
  const user = prisma.user.create({
    data,
    select: {
      id: true,
      admin: false,
      name: true,
      email: true,
      password: false,
      phone: true,
      createdAt: true,
      updatedAt: true,
      premium: true,
    },
  });
  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      admin: false,
      name: true,
      email: true,
      password: false,
      phone: true,
      createdAt: true,
      updatedAt: true,
      premium: true,
    },
  });
  return users;
};

export const getById = async (id: string) => {
  const users = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      admin: false,
      name: true,
      email: true,
      password: false,
      phone: true,
      createdAt: true,
      updatedAt: true,
      premium: true,
    },
  });
  return users;
};

export const getByEmail = async (email: string) => {
  const users = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      admin: false,
      name: true,
      email: true,
      password: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
      premium: true,
    },
  });
  return users;
};

export const updatedPassword = async (email: string, password: string) => {
  const newUser = await prisma.user.update({
    where: { email },
    data: { password },
  });

  return newUser;
};

export const deleteById = async (id: string) => {
  // Verificar se o usuário existe antes de deletá-lo
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user) {
    // Deletar o usuário
    await prisma.user.delete({
      where: { id },
    });
    return { deleted: true, message: "Usuário deletado com sucesso!" };
  }

  return {
    deleted: false,
    message: "Não foi possível deletar o usuário, verifique o id",
  };
};
