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

	useEffect(() => {
		// This is a hack to force the editor to update it's size based on it's parent during load,
		editorRef.current.editor.resize();
		if (solution) {
			setValue(solution);
		}
	});

	const change = (e) => {
		setValue(e);
	};

	return (
		<AceEditor
			className="editor"
			ref={editorRef}
			mode='javascript'
			theme='dracula'
			onChange={(e) => onChange(editorRef.current.editor.getValue(), change(e))}
			value={value}
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
		/>
	);
}
