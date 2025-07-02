import { useState } from "react";
import { TextEditor } from "../molecules/TextEditor";
import { Button } from "../atoms/Button";

export default function TextEditorShowcase() {
  const [value, setValue] = useState("");
  return (
    <div className="p-16">
      <TextEditor value={value} onChange={setValue} />
      <Button
        onClick={() => {
          console.log(value);
        }}
      >
        Save
      </Button>
      <div>{value}</div>
    </div>
  );
}
