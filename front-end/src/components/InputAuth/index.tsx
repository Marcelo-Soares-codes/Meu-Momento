import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  name: string;
  value: string;
  type: 'text' | 'email' | 'password' | 'tel';
  required: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputAuth = ({
  name,
  value,
  type,
  required,
  placeholder,
  onChange,
}: PropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <label className="block w-full text-sm text-gray indent-3 mt-5">
      <span className="mb-1">{name}</span>
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="block w-full px-4 pb-2 pt-1 font-sans border-b-2 border-gray rounded-none focus:outline-none focus:border-greenWeak focus:ring-greenWeak transition duration-300 ease-in-out"
          required={required}
        />
        {type === 'password' && (
          <FontAwesomeIcon
            onClick={togglePasswordVisibility}
            icon={showPassword ? faEyeSlash : faEye}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
          />
        )}
      </div>
    </label>
  );
};
