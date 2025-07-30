import { useRef } from "react";
import YouTube from "react-youtube";
import PropTypes from "prop-types";

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
    height: "420",
    width: "100%",
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

export const ResourcePropType = PropTypes.shape({
  lessonId: PropTypes.string.isRequired,
  lessonTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["video", "pdf", "link"]).isRequired,
  globalIndex: PropTypes.number.isRequired,
  moduleTitle: PropTypes.string,
  trackId: PropTypes.string.isRequired,
  enrollmentId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  watchedSeconds: PropTypes.number,
  name: PropTypes.string,
  duration: PropTypes.number,
});

LessonPlayerRY.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  resource: ResourcePropType.isRequired,
  onComplete: PropTypes.func.isRequired,
};
