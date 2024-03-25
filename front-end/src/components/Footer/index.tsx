import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <footer className="w-full h-64 md:h-44 bg-green grid sm:grid-cols-2 md:grid-cols-3 text-white">
      <div className="items-center flex flex-col justify-center order-3 md:order-3 ">
        <h3 className="text-1xl md:text-2xl">PAGINAS:</h3>

        <ul className="text-center text-gray m-2 text-sm md:text-base">
          <li className="hover:text-white cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faHome} /> Home
          </li>
          <li className="hover:text-white cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faInfoCircle} /> Sobre
          </li>
          <li className="hover:text-white cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faEnvelope} /> Contato
          </li>
          <li className="hover:text-white cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faPhone} /> Indicar Quadra
          </li>
        </ul>
      </div>

      <div className="items-center flex flex-col justify-center order-1 md:order-2 col-span-2 md:col-span-1">
        <img src="./assets/logo.png" alt="logo" className="w-24 md:w-32" />
      </div>

      <div className="items-center flex flex-col justify-center order-2 md:order-1 ml-5">
        <div>
          <h3 className="text-1xl md:text-2xl">CONTATO:</h3>

          <ul className="text-start  font-sans my-3 pl-2">
            <li className="mb-1 md:mb-2 text-sm">
              <FontAwesomeIcon icon={faEnvelope} /> EMAIL: meumomento@gmail.com
            </li>
            <li className="mb-2 text-sm md:text-base">
              <FontAwesomeIcon icon={faPhone} /> TELL: +55 (75) 9 9754-8745
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
