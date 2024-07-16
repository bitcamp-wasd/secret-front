import React, { useEffect } from 'react';
import "../assets/css/style.css";

const VideoPlay = ({ thumbnail, videoUrl }) => {
    useEffect(() => {
      if (videoUrl) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://player.vpe.naverncp.com/ncplayer.1.1.2.js?access_key=3ba6f6a18046b72c8fcd9f59aca5f5d5';
        script.async = true;
        console.log(videoUrl);
        script.onload = () => {
          const player = new window.ncplayer('video', {
            playlist: [
              {
                file: videoUrl,
                
              },
            ],
            autostart: true,
          });
        };
        document.getElementById('video').appendChild(script);
      }
    }, [videoUrl, thumbnail]);
  
    return <>

    <div id="video">
    </div>

    </>;
  };
  

export default VideoPlay;