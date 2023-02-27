import React, { useRef } from 'react';
import { default as Ace } from 'react-ace';

import style from './editor.module.css';

const AceEditor = Ace.default;
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

// code editor component
export default function Editor({ onChange }) {
	const editorRef = useRef();

	setInterval(() => console.log(editorRef.current.editor.getValue()), 1000);

	return (
		<AceEditor
			className={style.editor}
			ref={editorRef}
			mode='javascript'
			theme='dracula'
			onChange={() => onChange(editorRef.current.editor.getValue())}
			name='aceEditorComponent'
			showGutter={true}
			// maxLines="Infinity"
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
