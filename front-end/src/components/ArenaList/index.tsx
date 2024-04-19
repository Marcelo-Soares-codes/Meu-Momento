import { Link } from 'react-router-dom';

interface ArenaListProps {
  id: string;
  src: string;
  name: string;
}

export const ArenaList = ({ id, src, name }: ArenaListProps) => {
  return (
    <div className="max-w-52 mx-auto px-2 text-center cursor-pointer">
      <Link to={`/arena/${id}`}>
        <img
          src={src}
          alt={name}
          className="w-3/5 rounded-full mx-auto min-w-24"
        />
        <h2 className="mt-2 text-lg font-sans font-bold">{name}</h2>
      </Link>
    </div>
  );
};
