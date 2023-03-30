import React, { useEffect, useRef, useState } from 'react';
import { default as Ace } from 'react-ace';
import './editor.css';

const AceEditor = Ace.default;
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

// code editor component
export default function Editor({ onChange, solution }) {
	const editorRef = useRef();

	const [value, setValue] = useState('//please write your code in the solve function\nfunction solve(input) { \n\tconsole.log("Your Code Here!");\n}');

	// This is a hack to force the editor to update it's size based on it's parent during load,
	useEffect(() => {
		editorRef.current.editor.resize();
	});

	return (
		<AceEditor
			className="editor"
			ref={editorRef}
			mode='javascript'
			theme='dracula'
			onChange={() => onChange(editorRef.current.editor.getValue())}
			value={solution}
			name='aceEditorComponent'
			showGutter={true}
			width="unset"
			height="unset"
			editorProps={{
				$blockScrolling: true,
			}}
			setOptions={{
				enableBasicAutocompletion: true,
				useWorker: false
			}}
			value={value}
		/>
	);
}
