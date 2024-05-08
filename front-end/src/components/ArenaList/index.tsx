import { Link } from 'react-router-dom';

interface ArenaListProps {
  id: string;
  src: string;
  name: string;
}

export const ArenaList = ({ id, src, name }: ArenaListProps) => {
  return (
    <div className="max-w-52 mx-auto h-full px-2 cursor-pointer">
      <Link to={`/arena/${id}`} className="flex flex-col h-full items-center">
        <img
          src={src}
          alt={name}
          className="w-3/5 rounded-full mx-auto mb-2 min-w-24"
        />
        <h2 className="mt-auto text-lg text-center font-sans font-bold">
          {name}
        </h2>
      </Link>
    </div>
  );
};
