import { Button } from "../atoms/Button";
import { TextInput } from "./TextInput";

export const Searcher = () => {
  return (
    <div className="flex items-center">
      <TextInput
        placeholder="Find your favorite course"
        id="courseTextInput"
      ></TextInput>
      <Button>
        <span
          className="material-symbols-outlined "
          style={{ fontSize: "1.3rem" }}
        >
          search
        </span>
      </Button>
    </div>
  );
};
