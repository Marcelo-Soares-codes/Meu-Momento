import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  error: string;
  onClose: () => void;
};

const PopupError = ({ error, onClose }: PropsType) => {
  return (
    <div className="fixed right-10 top-16 flex bg-error text-white p-4 rounded-xl shadow-xl z-50">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-2xl mr-3" />
      <span className="flex-grow">{error}</span>
      <button className="ml-3" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default PopupError;
