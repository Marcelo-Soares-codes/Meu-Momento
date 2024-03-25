import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVideosList } from '../../utils/getVideoList';

export const VideosList = () => {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    const fetchVideosList = async () => {
      const videosList = await getVideosList();
      setVideos(videosList);
    };
    fetchVideosList();
  }, []);

  return (
    <section className="bg-gray mt-14 flex justify-center">
      {videos.length > 0 && (
        <ul className="mx-8 md:grid md:grid-cols-3 md:gap-6 w-5/6">
          {videos.map((video) => (
            <li key={video} className="text-center xl:p-5">
              <Link to={`/video/${video}`}>
                <video
                  className="rounded-lg mx-auto w-5/6 md:w-full hover:rounded-none"
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => e.currentTarget.pause()}
                >
                  <source
                    src={`http://localhost:5000/video/${video}`}
                    type="video/mp4"
                  />
                  Seu navegador não suporta a exibição de vídeos.
                </video>
                <p className="text-white font-sans text-md mb-5 mt-1">
                  {video}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
