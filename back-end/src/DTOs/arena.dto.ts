export interface ArenaDTO {
  name: string;
  email: string;
  password: string;
  profileBackgroundImage?: string;
  profileImage?: string;
  localization: string;
  videos?: VideoDTO[];
}

export interface VideoDTO {
  title: string;
  file: Buffer;
}

export interface ArenaWithVideoDTO extends ArenaDTO {
  video: VideoDTO;
}
