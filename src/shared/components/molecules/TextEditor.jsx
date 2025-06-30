import "./texteditor.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

import FroalaEditorComponent from "react-froala-wysiwyg";
import { useState } from "react";

export function TextEditor({ value, onChange = () => {} }) {
  return (
    <div>
      <FroalaEditorComponent
        model={value}
        onModelChange={onChange}
        config={{
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting",
              ],
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
              ],
            },
            moreRich: {
              buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "insertTable",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "embedly",
                "insertFile",
                "insertHR",
              ],
            },
            moreMisc: {
              buttons: [
                "undo",
                "redo",
                "fullscreen",
                "print",
                "getPDF",
                "spellChecker",
                "selectAll",
                "html",
                "help",
              ],
              align: "right",
              buttonsVisible: 2,
            },
          },
        }}
      />
    </div>
  );
}
