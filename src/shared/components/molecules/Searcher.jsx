import { useState, useEffect } from "react";
import { Button } from "../atoms/Button";
import { TextInput } from "./TextInput";
import PropTypes from "prop-types";

export const Searcher = ({
  placeholder = "Find your favorite course",
  query = "",
  setSearchQuery = () => {},
}) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <TextInput
        placeholder={placeholder}
        id="courseTextInput"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <Button type="submit">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "1.3rem" }}
        >
          search
        </span>
      </Button>
    </form>
  );
};

Searcher.propTypes = {
  placeholder: PropTypes.string,
  query: PropTypes.string,
  setSearchQuery: PropTypes.func,
};
