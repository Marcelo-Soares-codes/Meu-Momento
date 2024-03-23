import { Header } from '../../components/Header/index';
import { Footer } from '../../components/Footer/index';
import { SectionImage } from '../../sections/SectionImage/index';
import { SectionAbout } from '../../sections/SectionAbout/index';
import { SectionThreeColumns } from '../../sections/SectionThreeColumns/index';
import { SectionResources } from '../../sections/SectionResources';
import { SectionBudget } from '../../sections/SectionBudget';

function Home() {
  return (
    <main className="">
      <Header />
      <SectionImage />
      <SectionAbout />
      <SectionThreeColumns />
      <SectionResources />
      <SectionBudget />
      <Footer />
    </main>
  );
}

export default Home;
