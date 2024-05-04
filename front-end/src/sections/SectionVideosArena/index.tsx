import { VideosList } from '../../components/VideosList';

type PropsType = {
  arenaId: string;
  videos: string[];
};

export const SectionVideosArena = ({ arenaId, videos }: PropsType) => {
  return (
    <section className="">
      <h2>Videos</h2>
      <VideosList videos={videos} arenaId={arenaId} />
    </section>
  );
};
