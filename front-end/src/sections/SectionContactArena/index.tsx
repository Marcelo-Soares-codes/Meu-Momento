import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { ArenaType } from '../../DTOs/Arena.dto';

type PropsType = {
  arena: ArenaType;
};

export const SectionContactArena = ({ arena }: PropsType) => {
  return (
    <section className="">
      <h2 className="text-center text-2xl md:text-3xl">Contato</h2>

      <div className="my-14 mx-4">
        <h3 className="text-green md:text-lg">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Email:{' '}
          <span className="font-sans font-bold text-black">{arena.email}</span>
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
          <span className="font-sans font-bold text-black">{arena.phone}</span>
        </h3>
      </div>
    </section>
  );
};
