import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

import { Header } from '../../components/Header';
import { api } from '../../services/api';
import Loading from '../../components/Loading';

interface ArenaType {
  id: string;
  name: string;
  email: string;
  phone: string;
  localization: string;
  profileImage: string;
  profileBackgroundImage: string;
  createdAt: string;
  updatedAt: string;
}

const ArenaProfile = () => {
  const { id } = useParams();
  const [arena, setArena] = useState<ArenaType | null>(null);
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
          <section className="">
            <h2>Videos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus soluta commodi sunt adipisci saepe, id facere ea ut et
              porro perferendis doloremque. Eaque in inventore ipsam molestiae
              tempora, architecto incidunt!
            </p>
          </section>
        ) : (
          <section className="">
            <h2 className="text-center text-2xl md:text-3xl">Contato</h2>

            <div className="my-14 mx-4">
              <h3 className="text-green md:text-lg">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email:{' '}
                <span className="font-sans font-bold text-black">
                  {arena.email}
                </span>
              </h3>
              <h3 className="my-5 text-green md:text-lg">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Localização:{' '}
                <span className="font-sans font-bold text-black">
                  {arena.localization}
                </span>
              </h3>
              <h3 className="text-green md:text-lg">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Tel:{' '}
                <span className="font-sans font-bold text-black">
                  {arena.phone}
                </span>
              </h3>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ArenaProfile;
