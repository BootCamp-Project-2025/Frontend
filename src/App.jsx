// function App() {
//   return <>Hello world!</>;
// }

import { Button } from "./shared/components/atoms/Button";

function App() {
  return (
    <div className="flex flex-col gap-2 max-w-3xs">
      <Button styleType="addBtn" color="light">addbtn</Button>
      <Button styleType="callToAction">cta</Button>
      <Button styleType="editBtn"><img src="" alt="" /></Button>
      <Button styleType="deleteBtn">delete</Button>
      <Button styleType="searchBtn" color="blueLight">search</Button>
    </div>
  );
}


export default App;
