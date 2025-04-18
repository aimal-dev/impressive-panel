import './App.css'
// import RadioPlayer from './components/RadioPlayer'
import ChatUi from './components/ChatUi'
// import TestVideo from  './assets/testing-video.mp4'

// const TestVideo = 'https://viewmedia7219.bozztv.com/wmedia/viewmedia300/web_165/Stream/playlist.m3u8';
function App() {

  return (
   <>
   {/* <RadioPlayer url={TestVideo} /> */}
   <ChatUi 
      editorState={} 
      resetCreator={() => {}} 
      msgSender={() => {}} 
      showGiphyModal={false} 
      // Add other required props here with appropriate values
   />
   </>
  )
}

export default App
