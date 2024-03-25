import React from 'react';

type PropsType = {
  name: string;
  value: string;
  type: 'text' | 'email' | 'password' | 'tel';
  required: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Adicione onChange como uma prop
};

export const InputAuth = ({
  name,
  value,
  type,
  required,
  placeholder,
  onChange,
}: PropsType) => {
  return (
    <label className="block w-full text-sm text-gray indent-3 mt-5">
      <span className="mb-1">{name}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange} // Adicione onChange ao input
        className="block w-full px-4 pb-2 pt-1 font-sans border-b-2 border-gray rounded-none  focus:outline-none focus:border-greenWeak focus:ring-greenWeak transition duration-300 ease-in-out "
        required={required}
      />
    </label>
  );
};
