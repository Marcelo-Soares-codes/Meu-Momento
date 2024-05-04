import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVideosList } from '../../utils/getVideoList/index';

type PlayVideosProps = {
  arenaId: string;
  mainVideo: string;
};

export const PlayVideo = ({ arenaId, mainVideo }: PlayVideosProps) => {
  const [mainVideoUrl, setMainVideoUrl] = useState<string>(
    `https://www.youtube.com/embed/${mainVideo}`,
  );
  const [videos, setVideos] = useState<string[]>([]);
  const [videoKey, setVideoKey] = useState<number>(0); // Adicionando uma chave única para reiniciar o vídeo

  useEffect(() => {
    const fetchVideosList = async () => {
      const videosList = await getVideosList(arenaId);
      setVideos(videosList);
    };
    fetchVideosList();
  }, []);

  const handleVideoClick = (video: string) => {
    // Atualiza o estado local do vídeo principal
    setMainVideoUrl(`https://www.youtube.com/embed/${video}`);
    // Incrementa a chave única para reiniciar o vídeo
    setVideoKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="mt-12 font-sans text-center flex flex-col md:flex-row justify-center">
      <div className="mb-12 md:w-full md:px-8 max-w-6xl">
        <iframe
          title="Main Video"
          key={videoKey}
          src={mainVideoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-96 md:rounded-xl md:mx-auto max-w-4xl"
        ></iframe>
        <p className="text-2xl mt-2 md:mx-auto md:text-left max-w-4xl pl-5">
          {mainVideo}
        </p>
      </div>
      <div className="md:w-2/6 md:mr-12 flex justify-center">
        {videos.length > 0 && (
          <ul className="grid grid-cols-2 md:block">
            {videos
              .filter((video) => video !== mainVideo)
              .map((video) => (
                <li className="my-3 px-2 max-w-xl" key={video}>
                  {/* Adiciona o manipulador de eventos de clique para atualizar o vídeo principal */}
                  <Link
                    to={`/video/${arenaId}/${video}`}
                    onClick={() => handleVideoClick(video)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video}/0.jpg`}
                      alt="Video Thumbnail"
                      className="rounded-lg mx-auto w-full cursor-pointer"
                    />
                    <p className="text-sm">{video}</p>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
};
