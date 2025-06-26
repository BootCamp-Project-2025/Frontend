import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <p>Hello world</p>
      <div className="flex flex-col">
        <Link to="./courses" className="text-blue-700 ">
          courses
        </Link>
        <Link to="./health-check" className="text-blue-700 ">
          health-check
        </Link>
        <Link to="./course-select" className="text-blue-700 ">
          course-select
        </Link>
        <Link to="./teacher-profile" className="text-blue-700 ">
          teacher-profile
        </Link>
        <Link to="./button-gallery" className="text-blue-700 ">
          button-gallery
        </Link>
      </div>
    </>
  );
}

export default App;
