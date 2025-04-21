import "./App.css";
import RadioPlayer from "./components/video-player/RadioPlayer";

import BasicTabs from './components/index';
const TestVideo = 'https://viewmedia7219.bozztv.com/wmedia/viewmedia300/web_165/Stream/playlist.m3u8';
function App() {
  return (
    <>
    <RadioPlayer url={TestVideo} />
    <BasicTabs />
    </>
  );
}

export default App;
