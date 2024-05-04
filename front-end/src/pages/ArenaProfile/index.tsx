import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Header } from '../../components/Header';
import { api } from '../../services/api';
import Loading from '../../components/Loading';
import { ArenaType } from '../../DTOs/Arena.dto';
import { getVideosList } from '../../utils/getVideoList';
import { SectionContactArena } from '../../sections/SectionContactArena';
import { SectionVideosArena } from '../../sections/SectionVideosArena';

const ArenaProfile = () => {
  const { id } = useParams();
  const [arena, setArena] = useState<ArenaType | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('videos');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchArena = async () => {
      try {
        setLoading(true);
        const token = Cookies.get('@Auth:token');
        const response = await api.get(`/arena/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArena(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching arena data:', error);
      }
    };

    fetchArena();
  }, [id]);

  useEffect(() => {
    const fetchVideosList = async () => {
      if (arena?.id) {
        const videosList = await getVideosList(arena.id);
        setVideos(videosList);
      }
    };
    fetchVideosList();
  }, [arena?.id]);

  if (loading || !arena) {
    return <Loading />;
  }

  return (
    <main>
      <Header />

      <div className="relative flex justify-center">
        {arena.profileBackgroundImage ? (
          <img
            src={arena.profileBackgroundImage}
            alt="backgroundImage"
            className="w-full h-72 opacity-40"
          />
        ) : (
          <div className="bg-gray w-full h-72 bg-opacity-40"></div>
        )}
        <img
          src={arena.profileImage}
          alt={arena.name}
          className="absolute -bottom-1/3 sm:-bottom-1/2 w-1/2 max-w-48 min-w-32 rounded-full border-4 border-solid border-white"
        />
      </div>
      <h1 className="mt-28 sm:mt-40 text-center text-2xl ">{arena.name}</h1>

      <div className="flex justify-center mt-14 border-b-2 border-solid border-green">
        <div className="block mb-2">
          <div className="flex">
            <div className="">
              <input
                type="radio"
                id="videos"
                value="videos"
                checked={selectedOption === 'videos'}
                onChange={() => handleOptionChange('videos')}
                className="mr-2 hidden peer outline-none"
              />
              <label
                htmlFor="videos"
                className="cursor-pointer bg-gray bg-opacity-25 text-lg h-full w-full py-3 px-5 peer-checked:bg-green peer-checked:text-white rounded-t-lg rounded-r-none"
              >
                Videos
              </label>
            </div>

            <div className="">
              <input
                type="radio"
                id="contact"
                value="contact"
                checked={selectedOption === 'contact'}
                onChange={() => handleOptionChange('contact')}
                className="mr-2 hidden peer outline-none"
              />
              <label
                htmlFor="contact"
                className="cursor-pointer bg-gray bg-opacity-25 text-lg h-full w-full py-3 px-5 peer-checked:bg-green peer-checked:text-white rounded-t-lg rounded-l-none"
              >
                Contato
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        {selectedOption === 'videos' ? (
          <SectionVideosArena videos={videos} arenaId={arena.id} />
        ) : (
          <SectionContactArena arena={arena} />
        )}
      </div>
    </main>
  );
};

export default ArenaProfile;
