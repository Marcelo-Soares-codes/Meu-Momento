import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

export const Header = () => {
  const { user, logged } = useContext(AuthContext);
  return (
    <header className=" w-full h-32 sm:h-24 bg-green text-center flex flex-col sm:flex-row justify-center items-center shadow-md drop-shadow-sm md:drop-shadow-xl shadow-greenDark">
      <img
        src="/assets/logo-MeuMomento.png"
        alt="MEU MOMENTO"
        className="w-14 sm:w-16"
      />
      <h1 className="text-white text-2xl sm:text-3xl ml-3">Meu momento</h1>

      {logged ? (
        <Link to={'/user/profile'}>
          <img
            src={
              user && user.imageProfile
                ? user.imageProfile
                : '/assets/default-image-profile.jpg'
            }
            alt="profile"
            className="absolute right-7 md:right-16 top-1/4 md:1/3 w-10 rounded-full"
          />
        </Link>
      ) : (
        <></>
      )}
    </header>
  );
};
