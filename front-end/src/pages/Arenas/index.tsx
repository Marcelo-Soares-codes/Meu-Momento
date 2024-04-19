import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Header } from '../../components/Header/index';
import { api } from '../../services/api';
import { ArenaList } from '../../components/ArenaList';

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

const Arenas = () => {
  const [searchText, setSearchText] = useState('');
  const [arenas, setArenas] = useState<ArenaType[]>([]); // Especificando o tipo de elemento como ArenaType[]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('@Auth:token');
        const response = await api.get('/arenas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArenas(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredArenas = !!searchText
    ? arenas.filter((arena) => {
        const nameMatch = arena.name
          .toLowerCase()
          .includes(searchText.toLowerCase());

        return nameMatch;
      })
    : arenas;

  return (
    <main>
      <Header />
      <div className="flex justify-end mt-14 mr-7 md:mr-16">
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={(event) => handleChange(event)}
          value={searchText}
          className="relative px-2 pr-10 w-1/2 max-w-96 border-b-2 border-solid border-gray focus:border-green outline-none"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute mr-3 text-gray text-lg"
        />
      </div>
      <section className="pt-10 ">
        {filteredArenas.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-6">
            {filteredArenas.map(
              (
                arena: ArenaType, // Especificando o tipo de arena como ArenaType
              ) => (
                <li key={arena.id}>
                  <ArenaList
                    id={arena.id}
                    src={
                      arena.profileImage
                        ? arena.profileImage
                        : '/assets/default-image-profile.jpg'
                    }
                    name={arena.name}
                  />
                </li>
              ),
            )}
          </ul>
        ) : (
          <div className="flex h-72 items-center justify-center mx-10">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-gray text-xl md:text-3xl mr-3"
            />
            <h2 className="text-lg md:text-xl text-gray">
              Ops, parece que nenhuma arena foi encontrada...
            </h2>
          </div>
        )}
      </section>
    </main>
  );
};

export default Arenas;
