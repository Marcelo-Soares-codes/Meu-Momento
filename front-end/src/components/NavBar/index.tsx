import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/index';

interface NavBarProps {
  navVisible: boolean;
  setNavVisible: (arg0: boolean) => void;
}

export const NavBar = ({ navVisible, setNavVisible }: NavBarProps) => {
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <nav
          className={`fixed top-0 left-0 right-10 w-full sm:w-2/3 md:w-2/3 lg:w-2/5 h-screen bg-white z-20 transition-all duration-500 ${
            navVisible ? '' : '-left-full'
          }`}
        >
          <div className="px-5 mt-14">
            <div
              className="flex justify-center items-center text-center"
              onClick={() => {
                setLoading(true);
                if (navVisible) setNavVisible(false);
                navigate('/user/profile');
                setLoading(false);
              }}
            >
              <img
                src={
                  user && user.profileImage
                    ? user.profileImage
                    : '/assets/default-image-profile.jpg'
                }
                alt="profileImage"
                className="w-16 rounded-full"
              />
              <h2 className="ml-4 text-xl">{user?.name}</h2>
            </div>
            <ul className="flex flex-col mt-20 ml-0 text-black space-y-7 text-xl">
              <li className="hover:text-white hover:bg-gray py-2 px-4 rounded-lg duration-300 cursor-pointer transition-all">
                INICIO
              </li>
              <li className="hover:text-white hover:bg-gray py-2 px-4 rounded-lg duration-300 cursor-pointer transition-all">
                ARENAS
              </li>
              <li className="hover:text-white hover:bg-gray py-2 px-4 rounded-lg duration-300 cursor-pointer transition-all">
                PERFIL
              </li>
            </ul>
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-5 right-5 text-4xl cursor-pointer"
            onClick={() => setNavVisible(false)}
          />
          <button
            onClick={() => {
              setLoading(true);
              signOut();
              navigate('/');
            }}
            className="w-full absolute bottom-0 left-0 right-0 py-2 text-lg text-red border-t-2 border-red full duration-200 hover:bg-red hover:text-white"
          >
            Sair
          </button>
        </nav>
      )}
    </>
  );
};
