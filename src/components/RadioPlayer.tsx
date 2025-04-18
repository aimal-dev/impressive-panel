import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  url: string;
};

const RadioPlayer: React.FC<Props> = ({ url }) => {
  return (
    <div  style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}>
      <ReactPlayer
        width="100%"
        height="auto"
        url={url}
        playing
        autoplay={true}
        muted={false}
        controls={false}
        config={{
            file: {
              forceHLS: true,
            },
          }}
        />
    </div>
  );
};

export default RadioPlayer;
