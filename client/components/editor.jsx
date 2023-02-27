import React, { useRef } from 'react';
import { default as Ace } from 'react-ace';

const AceEditor = Ace.default;
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';

// code editor component
export default function Editor({ onChange }) {
	const editorRef = useRef();

	const annotations = [
		{
			row: 3, // must be 0 based
			column: 4, // must be 0 based
			text: 'error.message', // text to show in tooltip
			type: 'error'
		}
	];

	return (
		<div className='editor'>
			<AceEditor
				ref={editorRef}
				mode='javascript'
				theme='dracula'
				onChange={() => onChange(editorRef.current.editor.getValue())}
				name='aceEditorComponent'
				annotations={annotations}
				width='800px'
				showGutter={true}
				editorProps={{
					$blockScrolling: true,
				}}
				setOptions={{
					enableBasicAutocompletion: true,
					useWorker: false
				}}
			/>
		</div>
	);
}
