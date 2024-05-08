import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { NavBar } from '../NavBar';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
  const { user, logged } = useContext(AuthContext);
  const [navVisible, setNavVisible] = useState(false);
  const [menuButtonVisible, setMenuButtonVisible] = useState(true);

  useEffect(() => {
    // Adiciona ou remove a classe ao corpo dependendo da visibilidade da navegação
    if (navVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Limpa a classe ao desmontar o componente
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [navVisible]);

  // Função para fechar a navegação e mostrar o botão de menu
  const closeNavigation = () => {
    setNavVisible(false);
    setMenuButtonVisible(true);
  };

  return (
    <header
      className={`w-full h-32 sm:h-36 bg-green text-center flex flex-col ${logged ? 'grid grid-cols-3 sm:gap-4' : 'sm:flex-row'} justify-center items-center shadow-md drop-shadow-sm md:drop-shadow-xl shadow-greenDark`}
    >
      {logged ? (
        <div className="relative">
          <FontAwesomeIcon
            icon={faBars}
            className={` flex mx-5 text-3xl text-white transition-opacity duration-400 cursor-pointer ${menuButtonVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => {
              setNavVisible(true);
              setMenuButtonVisible(false);
            }}
          />
          <NavBar navVisible={navVisible} setNavVisible={closeNavigation} />
        </div>
      ) : (
        <></>
      )}
      <Link to="/" className="mt-1">
        <img
          src="/assets/logo-MeuMomento.png"
          alt="MEU MOMENTO"
          className="w-12 sm:w-14 mx-auto"
        />
        <h1 className="text-white text-xl sm:text-2xl ml-3">Meu momento</h1>
      </Link>

      {logged ? (
        <Link to={'/user/profile'}>
          <img
            src={
              user && user.profileImage
                ? user.profileImage
                : '/assets/default-image-profile.jpg'
            }
            alt="profile"
            className="absolute w-10 md:w-12 right-7 md:right-16 top-1/4 rounded-full"
          />
        </Link>
      ) : (
        <></>
      )}
    </header>
  );
};
