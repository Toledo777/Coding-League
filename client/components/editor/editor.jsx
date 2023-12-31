import React, { useEffect, useRef } from 'react';
import { default as Ace } from 'react-ace';
import './editor.css';

const AceEditor = Ace.default;
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

// code editor component
export default function Editor({ onChange }) {
	const editorRef = useRef();

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
