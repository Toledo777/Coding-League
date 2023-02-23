import React, { useRef } from "react";
import {default as Ace} from "react-ace";

const AceEditor = Ace.default;
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

// code editor component
export default function Editor(props) {
  const editorRef = useRef();


  // gets editor text value on change, can be used for saving editor code locally
  function onChange(newValue) {
    console.log("change", newValue);
  }

  const annotations = [
    {
      row: 3, // must be 0 based
      column: 4, // must be 0 based
      text: "error.message", // text to show in tooltip
      type: "error"
    }
  ];

  // event handler to handle code running
  function handleRun() {
    console.log("Running code");
    let problemCode = editorRef.current.editor.getValue();
  }

  // event handler to handle code submission
  function handleSubmit() {
    console.log("Submit code");
    let problemCode = editorRef.current.editor.getValue();
  }

  return (
    <div className="editor">
      <AceEditor
          ref={editorRef}
          mode="javascript"
          theme="dracula"
          // onChange={onChange}
          name="aceEditorComponent"
          annotations={annotations}
          width="800px"
          showGutter={true}
          editorProps={{ 
              $blockScrolling: true,
          }}
          setOptions={{
              enableBasicAutocompletion: true,
              useWorker: true,
          }}
      />
      <div className="editorButtons">
        <button onClick={handleRun}>Run</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};