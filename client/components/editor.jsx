import React from "react";
import {default as Ace} from "react-ace";

const AceEditor = Ace.default;
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

// code editor component
export default function Editor(props) {
  console.log(AceEditor)
    // takes as input new code that was changed
    
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
  }

  // event handler to handle code submission
  function handleSubmit() {
    console.log("Submit code");
  }
  return (
    <div className="editor">
      <AceEditor
          mode="javascript"
          theme="dracula"
          onChange={onChange}
          name="editorComponent"
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