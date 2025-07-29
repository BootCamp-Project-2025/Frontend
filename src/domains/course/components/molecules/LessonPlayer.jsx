import React, { useRef } from "react";
import YouTube from "react-youtube";

export default function LessonPlayerRY({ videoUrl, resource, onComplete }) {
  const playerRef = useRef(null);

  const videoId = extractYouTubeVideoId(videoUrl);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.pauseVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      const duration = playerRef.current.getDuration();

      onComplete({
        ...resource,
        type: "video",
        url: `${videoUrl}`,
        duration,
      });
    }
  };

  const options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={options}
      onReady={onPlayerReady}
      onStateChange={onPlayerStateChange}
    />
  );
}

function extractYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "");
    }

    return null;
  } catch {
    return null;
  }
}
