import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";

export default function ResourceItem({ resource, isActive, onSelectResource }) {
  const [videoTitle, setVideoTitle] = useState(null);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const getVideoTitleWithOEmbed = async (videoUrl) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`
      );

      if (!response.ok) throw new Error("Video not found or private");

      const data = await response.json();

      return {
        title: data.title,
        authorName: data.author_name,
        thumbnail: data.thumbnail_url,
        width: data.width,
        height: data.height,
      };
    } catch (error) {
      console.error("Error with oEmbed:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (resource.type === "video" && resource.url) {
      setLoadingTitle(true);
      setTitleError(false);

      getVideoTitleWithOEmbed(resource.url)
        .then((videoData) => {
          setVideoTitle(videoData.title);
        })
        .catch((error) => {
          console.error("Failed to fetch video title:", error);
          setTitleError(true);
        })
        .finally(() => {
          setLoadingTitle(false);
        });
    }
  }, [resource.url, resource.type]);

  const getDisplayName = () => {
    if (resource.type === "video") {
      if (loadingTitle) return "Cargando título...";
      if (titleError) return resource.name || "Error al cargar título";
      if (videoTitle) return videoTitle;
      return resource.name || "Video sin título";
    }
    return resource.name;
  };

  return (
    <li
      onClick={() => {
        onSelectResource(resource.globalIndex);
      }}
      className={`flex items-center justify-start gap-4 px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      {resource.type === "video" && (
        <Icon icon={"youtube"} className={"w-6 h-6 flex-shrink-0"} />
      )}

      {resource.type === "pdf" && <span className="flex-shrink-0">📄</span>}

      <span
        className={`truncate w-full ${loadingTitle ? "text-gray-500" : ""} ${titleError ? "text-red-500" : ""}`}
        title={getDisplayName()}
      >
        {getDisplayName()}
      </span>

      {resource.completed && (
        <Icon
          icon={"checkSyllabus"}
          className="text-green-500 w-6 h-6 flex-shrink-0 ml-auto"
        />
      )}
    </li>
  );
}

export const ResourcePropType = PropTypes.shape({
  lessonId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  globalIndex: PropTypes.number.isRequired,
});

ResourceItem.propTypes = {
  resource: ResourcePropType.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelectResource: PropTypes.func.isRequired,
};
