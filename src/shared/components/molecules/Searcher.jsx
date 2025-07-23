import { Button } from "../atoms/Button";
import { TextInput } from "./TextInput";
import PropTypes from "prop-types";

export const Searcher = ({ placeholder = "Find your favorite course" }) => {
  return (
    <div className="flex items-center gap-4">
      <TextInput placeholder={placeholder} id="courseTextInput"></TextInput>
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

Searcher.propTypes = {
  placeholder: PropTypes.string,
};
