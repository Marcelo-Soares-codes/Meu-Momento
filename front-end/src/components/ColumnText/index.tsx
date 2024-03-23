type ColumnTextProps = {
  title: string;
  texts: string[];
};

export const ColumnText = ({ title, texts }: ColumnTextProps) => {
  return (
    <div className="my-4 max-w-72">
      <h3 className="mb-3 text-lg">{title}</h3>
      <ul className="mx-3">
        {texts.map((text) => (
          <li key={text}>
            <div
              className="font-sans text-sm"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
