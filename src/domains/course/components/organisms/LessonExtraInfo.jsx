import PropTypes from "prop-types";

export default function LessonExtraInfo({ description, resources }) {
  return (
    <div className="flex flex-col gap-4">
      {description && (
        <div className="bg-gray-100 p-4 rounded text-gray-700">
          <h3 className="font-semibold mb-2">Description</h3>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}

      {resources.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="list-disc list-inside">
            {resources.map((res) => (
              <li key={res.id || res.url}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {res.name || "Resource"}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

LessonExtraInfo.propTypes = {
  description: PropTypes.string,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};
