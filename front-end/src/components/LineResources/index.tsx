type LineResourcesProps = {
  title: string;
  text: string;
  src: string;
  alt: string;
};

export const LineResources = ({
  title,
  text,
  src,
  alt,
}: LineResourcesProps) => {
  return (
    <div className="mt-12 items-center">
      <h3 className="text-xl md:text-2xl text-center md:text-start">{title}</h3>
      <div className="mt-4 md:flex md:justify-between">
        <div
          className="font-sans text-sm md:text-base max-w-lg md:min-w-76 mx-auto md:m-0"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
        <img
          src={src}
          alt={alt}
          className="mt-4 mx-auto md:m-0 md:ml-16 md:max-w-lg md:w-1/2"
        />
      </div>
    </div>
  );
};
