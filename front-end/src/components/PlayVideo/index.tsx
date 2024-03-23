import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVideosList } from '../../utils/getVideoList/index';

type PlayVideosProps = {
  mainVideo: string;
};

export const PlayVideo = ({ mainVideo }: PlayVideosProps) => {
  const [mainVideoUrl, setMainVideoUrl] = useState<string>(
    `http://localhost:5000/video/${mainVideo}`,
  );
  const [videos, setVideos] = useState<string[]>([]);
  const [videoKey, setVideoKey] = useState<number>(0); // Adicionando uma chave única para reiniciar o vídeo

  useEffect(() => {
    const fetchVideosList = async () => {
      const videosList = await getVideosList();
      setVideos(videosList);
    };
    fetchVideosList();
  }, []);

  const handleVideoClick = (video: string) => {
    // Atualiza o estado local do vídeo principal
    setMainVideoUrl(`http://localhost:5000/video/${video}`);
    // Incrementa a chave única para reiniciar o vídeo
    setVideoKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="mt-12 font-sans text-white text-center flex flex-col md:flex-row justify-center">
      <div className="mb-12 md:w-full md:px-8 max-w-6xl">
        <video
          key={videoKey}
          controls
          className="w-full md:rounded-xl md:mx-auto max-w-4xl"
        >
          <source src={mainVideoUrl} type="video/mp4" />
          Seu navegador não suporta a exibição de vídeos.
        </video>
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
                    to={`/video/${video}`}
                    onClick={() => handleVideoClick(video)}
                  >
                    <video
                      className="rounded-lg mx-auto w-full"
                      onMouseOver={(e) => e.currentTarget.play()}
                      onMouseOut={(e) => e.currentTarget.pause()}
                    >
                      <source
                        src={`http://localhost:5000/video/${video}`}
                        type="video/mp4"
                      />
                      Seu navegador não suporta a exibição de vídeos.
                    </video>
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
