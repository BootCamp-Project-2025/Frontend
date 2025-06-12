import CertificationList from "./domains/teacher/components/organisms/CertificationList";

function App() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-10 bg-gray-100 place-items-center">
      <CertificationList />
    </div>
  );
}

export default App;
