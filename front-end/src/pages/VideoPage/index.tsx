import { PlayVideo } from '../../components/PlayVideo/index';
import { Header } from '../../components/Header/index';

import { useParams } from 'react-router-dom';

interface VideoPageProps {
  mainVideo: string; // Define the type of the "mainVideo" prop
}

const VideoPage: React.FC<VideoPageProps> = () => {
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
