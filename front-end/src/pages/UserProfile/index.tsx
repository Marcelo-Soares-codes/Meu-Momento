import { useContext, useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import ImageCompressor from 'image-compressor.js';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../context/auth';
import { Header } from '../../components/Header';
import PopupError from '../../components/PopupError';
import Loading from '../../components/Loading';
import PopupSuccess from '../../components/PopupSuccess';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, signOut, updateInfoUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(user?.profileImage || null);
  const [name, setName] = useState(user?.name ?? '');
  const [nameEditMode, setNameEditMode] = useState(false);
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [phoneEditMode, setPhoneEditMode] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errors, setErrors] = useState<{ message: string; id: number }[]>([]);
  const [success, setSuccess] = useState<{ message: string; id: number }[]>([]);

  const handleCloseError = (id: number) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  const handleCloseSuccess = (id: number) => {
    setSuccess(success.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (
      (userImage != '' &&
        userImage != user?.profileImage &&
        userImage != '/assets/default-image-profile.jpg') ||
      (name != user?.name && name != '') ||
      phone != user?.phone
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userImage, name, phone]);

  // Definir tipo para o evento
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return; // Verificar se o arquivo foi selecionado

    try {
      const compressedImage = await new ImageCompressor().compress(file, {
        maxWidth: 500, // Definir uma largura máxima para a imagem
        maxHeight: 500, // Definir uma altura máxima para a imagem
        quality: 0.6, // Definir a qualidade da imagem (entre 0 e 1)
        mimeType: 'image/jpeg', // Tipo de imagem de saída
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        // Atualiza o estado com a imagem em base64
        setUserImage(reader.result as string);
      };

      reader.readAsDataURL(compressedImage); // Ler o arquivo comprimido como base64
    } catch (error) {
      console.error('Erro ao comprimir a imagem:', error);
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    setPhone(newPhone);

    if (
      (userImage != '' &&
        userImage != user?.profileImage &&
        userImage != '/assets/default-image-profile.jpg') ||
      (name != user?.name && name != '') ||
      newPhone != user?.phone
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleSave = () => {
    setLoading(true);
    const data = { id: user?.id ?? '', name, profileImage: userImage, phone };
    const token = Cookies.get('@Auth:token') || '';
    if (!token) {
      setLoading(false);
      navigate('/login');
    }

    try {
      updateInfoUser(data, token);
      setSuccess([
        ...success,
        {
          message: 'Usuário atualizado com sucesso!',
          id: new Date().getTime(),
        },
      ]);
      setButtonDisabled(true);
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      setErrors([
        ...errors,
        { message: error.message, id: new Date().getTime() },
      ]);
    }
    setLoading(false);
  };

  const toggleNameEditMode = () => {
    setNameEditMode((prevMode) => !prevMode);
  };

  const togglePhoneEditMode = () => {
    setPhoneEditMode((prevMode) => !prevMode);
  };
  return (
    <main className="flex flex-col h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="flex-grow flex flex-col justify-between mt-10">
            <div className="w-3/4 max-w-md mx-auto">
              <div className="w-44 mx-auto text-right">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="profile-image">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer"
                  />
                  <img
                    src={
                      userImage
                        ? userImage
                        : '/assets/default-image-profile.jpg'
                    }
                    alt="profile"
                    className="w-32 rounded-full mx-auto"
                  />
                </label>
              </div>
              <div className="flex mt-3 ">
                {nameEditMode ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={toggleNameEditMode}
                    autoFocus
                    className="text-center text-xl mx-auto"
                  />
                ) : (
                  <>
                    <h1 className="text-center text-xl ml-auto">{name}</h1>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="ml-auto cursor-pointer"
                      onClick={toggleNameEditMode}
                    />
                  </>
                )}
              </div>
              <div className="w-full mt-7 border-b-2 border-solid border-gray flex justify-center items-center">
                <h2 className="font-sans text-base mx-auto">{user?.email}</h2>
              </div>
              <div className="flex mt-5">
                {phoneEditMode ? (
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={togglePhoneEditMode}
                    autoFocus
                    className="font-sans text-base mx-auto mb-0.5"
                  />
                ) : (
                  <>
                    <div className="w-full border-b-2 border-solid border-gray flex justify-center items-center">
                      <h2 className="font-sans text-base ml-auto">{phone}</h2>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="ml-auto cursor-pointer"
                        onClick={togglePhoneEditMode}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-7 md:mt-10 text-center">
                <Link
                  to={'/recover-password'}
                  className="bg-greenDark inline-block w-full py-3 mt-3 mb-5 md:mt-7 text-white hover:bg-green duration-300"
                >
                  Alterar senha
                </Link>
              </div>
              <div className="w-full flex justify-center">
                <button
                  disabled={buttonDisabled}
                  onClick={handleSave}
                  className={`bg-${buttonDisabled ? 'gray' : 'green'} w-1/2 text-white  text-lg py-3 my-7 rounded-xl shadow-lg border-${buttonDisabled ? 'gray' : 'green'} border-solid hover:border-4 hover:py-2 ${
                    buttonDisabled
                      ? 'cursor-not-allowed'
                      : 'hover:bg-white hover:text-green'
                  }`}
                >
                  Salvar
                </button>
              </div>
            </div>
            <div className="w-3/4 max-w-md mx-auto">
              <button
                onClick={() => {
                  setLoading(true);
                  signOut();
                  navigate('/');
                }}
                className="w-full py-1 my-2 text-lg text-red border-2 border-red rounded-full duration-200 hover:bg-red hover:text-white"
              >
                Sair
              </button>
            </div>
          </div>
          {errors.length > 0 && (
            <div className="flex flex-col items-center fixed top-16 right-5 md:right-10 z-50">
              {errors.map(({ message, id }) => (
                <PopupError
                  key={id}
                  error={message}
                  onClose={() => handleCloseError(id)}
                />
              ))}
            </div>
          )}
          {success.length > 0 && (
            <div className="flex flex-col items-center fixed top-24 right-5 md:right-10 z-50">
              {success.map(({ message, id }) => (
                <PopupSuccess
                  key={id}
                  success={message}
                  onClose={() => handleCloseSuccess(id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default UserProfile;
