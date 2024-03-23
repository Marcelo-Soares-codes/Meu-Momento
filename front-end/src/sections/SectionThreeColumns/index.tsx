import { ColumnText } from '../../components/ColumnText/index';

export const SectionThreeColumns = () => {
  return (
    <section>
      <div className="flex flex-col justify-center text-center md:w-4/5 mx-auto">
        <h2 className="text-3xl md:text-4xl mx-4">
          Inove sua Experiência Esportiva
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 md:gap-x-10 mb-14 mt-7 mx-auto">
          <ColumnText
            title="Destaque-se no Cenário Esportivo"
            texts={[
              `
          Com nossa abordagem inovadora de registro e compartilhamento de momentos épicos,
          sua arena se torna o epicentro de emoção e inspiração para atletas e espectadores.
          Ao oferecer uma plataforma que permite a captura e a disseminação de momentos marcantes,
          você não apenas promove a excelência esportiva,
          mas também solidifica a posição da sua arena como um destino imperdível para todos os amantes do esporte.`,
            ]}
          />
          <ColumnText
            title="Amplie o Horizonte da sua Arena"
            texts={[
              `
      Ao implementar uma solução avançada de gravação e compartilhamento de momentos marcantes,
      sua arena se torna um ponto de referência para atletas ávidos por experiências diferenciadas.
      Isso não apenas eleva a reputação do local, mas também atrai uma base de jogadores mais diversificada e engajada.`,
            ]}
          />
          <div className="sm:col-span-2 md:col-span-1 sm:mx-auto">
            <ColumnText
              title="Reviva seus Melhores Momentos em Instantes"
              texts={[
                `
          Com a captura detalhada dos momentos de destaque, os jogadores podem reviver instantaneamente suas façanhas e conquistas,
          além de compartilhá-las com uma comunidade apaixonada através de nossa plataforma integrada.
          Essa conexão instantânea não só fortalece os laços entre os participantes, mas também amplia o alcance da sua arena,
          atraindo novos talentos e espectadores.`,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
