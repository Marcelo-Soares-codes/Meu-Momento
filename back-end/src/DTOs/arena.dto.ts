export interface ArenaDTO {
  name: string;
  email: string;
  password: string;
}

export interface VideoDTO {
  title: string;
  file: Buffer;
}

export interface ArenaWithVideoDTO extends ArenaDTO {
  video: VideoDTO;
}
