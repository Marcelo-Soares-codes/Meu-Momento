import { LineResources } from '../../components/LineResources';

export const SectionResources = () => {
  return (
    <section className="bg-green text-white py-10">
      <div className="w-4/5 mx-auto">
        <h2 className="text-3xl text-center ">RECURSOS DO NOSSO APP</h2>
        <div>
          <ul>
            <li>
              <LineResources
                title="Detalhes das suas jogadas"
                text="As arenas que adotam o app <b>Meu Momento</b> têm acesso ao
                  que há de mais avançado em tecnologia para capturar e reviver
                  momentos esportivos em detalhes. Nossa plataforma oferece
                  recursos de gravação de alta qualidade que garantem a precisão
                  e a riqueza dos replays!"
                src="./assets/images/img-basquete.jpg"
                alt="Detalhes das suas jogadas"
              />
            </li>
            <li>
              <LineResources
                title="Salve os melhores cortes"
                text="Baixe os recortes dos momentos mais marcantes quando quiser,
                  de forma simples e conveniente. Com apenas alguns cliques,
                  você tem acesso aos destaques da partida, permitindo que você
                  os compartilhe, assista e relembre sempre que desejar. Não
                  importa se foi uma jogada incrível ou um momento hilário!"
                src="./assets/images/img-futsal.jpg"
                alt="Salve os melhores cortes"
              />
            </li>
            <li>
              <LineResources
                title="Os melhores momentos recortados"
                text="Função de recorte que permite aos usuários capturar o momento
                  exato de uma jogada épica ou extremamente engraçada durante a
                  partida. Com essa ferramenta intuitiva, você pode destacar e
                  compartilhar os momentos mais memoráveis com seus colegas!"
                src="./assets/images/img-volei.jpg"
                alt="Os melhores momentos recortados"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
