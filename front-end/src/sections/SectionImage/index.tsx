export const SectionImage = () => {
  return (
    <section>
      <div
        style={{ backgroundImage: `url("./assets/home-background.png")` }}
        className="w-full h-144 md:h-screen bg-cover bg-center flex flex-col justify-center items-center"
      >
        <h2 className="text-white text-center text-3xl md:text-4xl mx-4 mb-4">
          Eternize aquela jogada épica
        </h2>
        <p className="text-white font-sans max-w-xl text-sm md:text-base text-center mx-8">
          Não deixe escapar aquele gol espetacular ou aquela jogada genial.
          Registre tudo para reviver esses momentos emocionantes sempre que
          quiser!
        </p>

        <div className="mt-16">
          <button className="bg-green px-10 py-3 rounded-full mx-10 text-white text-2xl mb-10 hover:bg-opacity-0 hover:border-4 hover:py-2 hover:px-9 border-green  transition duration-300 ease-in-out">
            LOGIN
          </button>
          <button className="px-10 py-3 rounded-full mx-10 text-green text-2xl border-4 border-green hover:border-white hover:text-white transition duration-300 ease-in-out">
            CRIAR CONTA
          </button>
        </div>
      </div>
    </section>
  );
};
