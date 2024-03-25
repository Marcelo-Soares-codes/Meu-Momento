import { PlayVideo } from '../../components/PlayVideo/index';
import { Header } from '../../components/Header/index';

import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const { mainVideo } = useParams();

  return (
    <main className="bg-grey">
      <Header />
      <PlayVideo
        mainVideo={mainVideo as string} /* Pass `mainVideo` as `videoId` prop */
      />
    </main>
  );
};

export default VideoPage;
