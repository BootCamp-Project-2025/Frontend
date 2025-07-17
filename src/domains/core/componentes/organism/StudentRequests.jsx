import { useCallback } from "react";
import SearchBar from "../../../../shared/components/molecules/SearchBar";
import usePopup from "../../../../shared/hooks/usePopup";
import StudentEmptyRequestsMessage from "../molecules/StudentEmptyRequestsMessage";
import RequestList from "./RequestList";
import RequestForm from "./RequestForm";

const requestList = [
  {
    title: "Request Title",
    description:
      "I require to learn JavaScript over the next month. My primary goals are to understand key concepts such as closures, hoisting, scope, this keyword, promises, async/await, and event loop. Additionally, I want to become comfortable working with arrays and objects, using higher-order functions, and writing clean, modular code. This foundation will help me build more complex applications and prepare me for frameworks like React or Node.js in the near future.",
    estimation: 5,
  },
  {
    title: "Request Title",
    description:
      "I require to learn JavaScript over the next month. My primary goals are to understand key concepts such as closures, hoisting, scope, this keyword, promises, async/await, and event loop. Additionally, I want to become comfortable working with arrays and objects, using higher-order functions, and writing clean, modular code. This foundation will help me build more complex applications and prepare me for frameworks like React or Node.js in the near future.",
    estimation: 5,
  },
  {
    title: "Request Title",
    description:
      "I require to learn JavaScript over the next month. My primary goals are to understand key concepts such as closures, hoisting, scope, this keyword, promises, async/await, and event loop. Additionally, I want to become comfortable working with arrays and objects, using higher-order functions, and writing clean, modular code. This foundation will help me build more complex applications and prepare me for frameworks like React or Node.js in the near future.",
    estimation: 5,
  },
  {
    title: "Request Title",
    description:
      "I require to learn JavaScript over the next month. My primary goals are to understand key concepts such as closures, hoisting, scope, this keyword, promises, async/await, and event loop. Additionally, I want to become comfortable working with arrays and objects, using higher-order functions, and writing clean, modular code. This foundation will help me build more complex applications and prepare me for frameworks like React or Node.js in the near future.",
    estimation: 5,
  },
];

export default function StudentRequests() {
  const { openPopup, closePopup } = usePopup();

  const handleNewRequest = useCallback(() => {
    openPopup(RequestForm, { closePopup: closePopup }, false);
  }, [openPopup, closePopup]);

  return (
    <div>
      <SearchBar placeholder="Find a specific request" />
      {requestList.length === 0 ? (
        <StudentEmptyRequestsMessage handleNewRequest={handleNewRequest} />
      ) : (
        <RequestList
          handleNewRequest={handleNewRequest}
          requestList={requestList}
        />
      )}
    </div>
  );
}
