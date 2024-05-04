import { ArenaDTO, VideoDTO } from "../DTOs/arena.dto";
import { prisma } from "../services/prisma";
import { Prisma } from "@prisma/client";

export const createArena = async (data: Prisma.ArenaCreateInput) => {
  const arena = await prisma.arena.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      localization: true,
      password: false,
      createdAt: true,
      updatedAt: true,
    },
  });
  return arena;
};

export const getAllArenas = async () => {
  const arenas = await prisma.arena.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      localization: true,
      password: false,
      profileImage: true,
      profileBackgroundImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return arenas;
};

export const getById = async (id: string) => {
  const arenas = await prisma.arena.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      localization: true,
      password: false,
      profileImage: true,
      profileBackgroundImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return arenas;
};

export const getByEmail = async (email: string) => {
  const arenas = await prisma.arena.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      localization: true,
      password: true,
      profileImage: true,
      profileBackgroundImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return arenas;
};

export const getByName = async (name: string) => {
  const arenas = await prisma.arena.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      localization: true,
      password: false,
      profileImage: true,
      profileBackgroundImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return arenas;
};

export const addVideoToArena = async (arenaId: string, videoData: VideoDTO) => {
  const arena = await prisma.arena.findUnique({
    where: { id: arenaId },
    include: { videos: true }, // Incluindo a relação de vídeos
  });

  if (!arena) {
    throw new Error("Arena não encontrada");
  }

  // Verifique se a arena atingiu o limite máximo de vídeos
  if (arena.videos.length >= arena.maxVideos) {
    throw new Error("A arena atingiu o limite máximo de vídeos");
  }

  const video = await prisma.video.create({
    data: {
      ...videoData,
      arena: { connect: { id: arenaId } },
    },
  });

  return video;
};

export const getAllVideos = async (arenaId: string) => {
  /*
  Infelizmente não pude usar uma CDN boa para armazenar os videos por motivos de custo,
  porem posso fazer uma demonstração do projeto usando os videos a seguir!

  const videos = await prisma.video.findMany({
    where: { arenaId },
    select: {
      id: true,
      title: true,
      file: true,
      createdAt: true,
    },
  });*/
  const videos = [
    "zVtcm1oSBZA",
    "bXRfMxquuP8",
    "OXn6LOc72Xw",
    "kxHTxMWyX9I",
    "RcmiIpqxORE",
    "f9KeRWrZ4O4",
    "em_aBSvxKng",
    "yki3DgBOb98",
    "3Vhe2oe-Oao",
    "V5_jU1klw1U",
  ];
  return videos;
};

export const deleteById = async (id: string) => {
  // Verificar se a arena existe antes de deletá-lo
  const arena = await prisma.arena.findUnique({
    where: { id },
  });

  if (arena) {
    // Deletar a arena
    await prisma.arena.delete({
      where: { id },
    });
    return { deleted: true, message: "Arena deletada com sucesso!" };
  }

  return {
    deleted: false,
    message: "Não foi possível deletar a Arena, verifique o id",
  };
};
