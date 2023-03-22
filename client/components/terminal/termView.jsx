import React, { createRef, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import './xterm.css';

// Used to handle data streams meant to be interpreted from a terminal emulator.
// Otherwise any output using ansi escape codes would be jumbled and malformed
export default function TermView({ data }) {
	const termElement = createRef();
	const term = useRef();

	useEffect(() => {
		term.current = new Terminal();
		const fitAddon = new FitAddon();
		term.current.loadAddon(fitAddon);
		term.current.open(termElement.current);
		const fit = () => fitAddon.fit();
		fit();
		addEventListener('resize', fit);

		// Dispose of the terminal instance on unmount
		return () => {
			window.removeEventListener('resize', fit);
			term.current.dispose();
		};
	}, []);

	useEffect(() => {
		term.current.clear();
		term.current.reset();
		term.current.write(data);
	}, [data]);


	return <div>
		<div ref={termElement}></div >
	</div>;
}