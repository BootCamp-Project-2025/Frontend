import PropTypes from "prop-types";
import "./texteditor.css";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isTextNode,
  isHTMLElement,
  ParagraphNode,
  TextNode,
} from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

import TextEditorTheme from "../../utils/TextEditorTheme";
import TextEditorToolbarPlugin from "../atoms/TextEditorToolbarPlugin";
import { useEffect } from "react";

const MIN_ALLOWED_FONT_SIZE = 8;
const MAX_ALLOWED_FONT_SIZE = 72;

const parseAllowedFontSize = (input) => {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/);
  if (match) {
    const n = Number(match[1]);
    if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
      return input;
    }
  }
  return "";
};

function parseAllowedColor(input) {
  return /^rgb\(\d+, \d+, \d+\)$/.test(input) ? input : "";
}

const removeStylesExportDOM = (editor, target) => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportMap = new Map([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element) => {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = () => {
  const importMap = {};

  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

export function TextEditor({
  onChange = () => {},
  showToolbar = true,
  placeholder = "",
  // eslint-disable-next-line no-unused-vars
  value,
  disabled = false,
}) {
  const editorConfig = {
    html: {
      export: exportMap,
      import: constructImportMap(),
    },
    namespace: "React.js Demo",
    editable: !disabled,
    nodes: [ParagraphNode, TextNode],
    onError(error) {
      throw error;
    },
    theme: TextEditorTheme,
    editorState: value
      ? (editor) => {
          const parser = new DOMParser();
          const isHtml = value.trim().startsWith("<");

          editor.update(() => {
            const root = $getRoot();
            root.clear();

            if (isHtml) {
              const dom = parser.parseFromString(value, "text/html");
              const nodes = $generateNodesFromDOM(editor, dom);

              if (nodes.length === 1 && nodes[0].getType() === "text") {
                const paragraph = $createParagraphNode();
                paragraph.append(nodes[0]);
                root.append(paragraph);
              } else {
                root.append(...nodes);
              }
            } else {
              const paragraph = $createParagraphNode();
              const textNode = $createTextNode(value);
              paragraph.append(textNode);
              root.append(paragraph);
            }
          });
        }
      : undefined,
  };

  useEffect(() => {}, []);

  const handleGetHtml = (editorState, editor) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      onChange(htmlString);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig} key={value == null ? 0 : 1}>
      <div className="editor-container">
        {showToolbar ? <TextEditorToolbarPlugin /> : <></>}

        <div className={`editor-inner ${showToolbar ? "" : "no-toolbar"}`}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
          <OnChangePlugin ignoreSelectionChange onChange={handleGetHtml} />
        </div>
      </div>
    </LexicalComposer>
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func,
  showToolbar: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};
