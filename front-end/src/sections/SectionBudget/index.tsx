import { useState, ChangeEvent, FormEvent } from 'react';

export const SectionBudget = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cep: '',
    quantitySquares: '',
    quantidadeCams: '',
    moreInfo: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Dados do formulário:', formData);
    setFormData({
      name: '',
      email: '',
      cep: '',
      quantitySquares: '',
      quantidadeCams: '',
      moreInfo: '',
    });
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl text-center">
        SOLICITE UM ORÇAMENTO
      </h2>

      <form className="flex flex-col mt-6 items-center" onSubmit={handleSubmit}>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          Nome<span className="text-red text-xl">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
            required
          />
        </label>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          Email<span className="text-red text-xl">*</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
            required
          />
        </label>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          CEP<span className="text-red text-xl">*</span>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
            required
          />
        </label>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          Quantidade de quadras<span className="text-red text-xl">*</span>
          <input
            type="number"
            name="quantitySquares"
            value={formData.quantitySquares}
            onChange={handleChange}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
            required
          />
        </label>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          Quantidade de cameras<span className="text-red text-xl">*</span>
          <input
            type="number"
            name="quantidadeCams"
            value={formData.quantidadeCams}
            onChange={handleChange}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
            required
          />
        </label>
        <label className="block w-3/4 max-w-sm indent-2 my-1 font-sans text-sm">
          Mais informações
          <textarea
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleChange}
            rows={4}
            className="block w-full border-2 border-black rounded-2xl p-1 pl-3 focus:outline-none focus:ring-1 focus:ring-greenWeak focus:border-greenWeak"
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-black text-white text-xl w-3/4 max-w-sm py-3 mt-8"
        >
          Enviar
        </button>
      </form>
    </section>
  );
};
