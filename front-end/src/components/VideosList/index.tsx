import { Link } from 'react-router-dom';

type VideosListProps = {
  arenaId: string;
  videos: string[];
};

export const VideosList = ({ arenaId, videos }: VideosListProps) => {
  return (
    <section className=" mt-14 flex justify-center">
      {videos.length > 0 ? (
        <ul className="mx-8 md:grid md:grid-cols-3 md:gap-6 w-5/6">
          {videos.map((video, index) => (
            <li key={index} className="text-center xl:p-5">
              <Link to={`/video/${arenaId}/${video}`}>
                <img
                  src={`https://img.youtube.com/vi/${video}/0.jpg`}
                  alt="Video Thumbnail"
                  className="rounded-lg mx-auto w-full cursor-pointer"
                />
                {/*<video
                  className="rounded-lg mx-auto w-5/6 md:w-full hover:rounded-none"
                  controls // Adiciona controles de vídeo (play, pause, etc.)
                >
                  <source
                    src={`https://www.youtube.com/embed/${video}`}
                    type="video/mp4"
                  />
                  Seu navegador não suporta a exibição de vídeos.
          </video>*/}
                <p className=" font-sans text-md mb-5 mt-1">
                  Vídeo {index + 1}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>Parece que essa arena não tem vídeos ainda</h2>
      )}
    </section>
  );
};
