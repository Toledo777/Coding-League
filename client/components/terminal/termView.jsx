import React, { createRef, useEffect } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import './xterm.css';

// Used to handle data streams meant to be interpreted from a terminal emulator.
// Otherwise any output using ansi escape codes would be jumbled and malformed
export default function TermView({ label, data }) {
	const termElement = createRef();

	useEffect(() => {
		const term = new Terminal();
		const fitAddon = new FitAddon();
		term.loadAddon(fitAddon);
		term.open(termElement.current);
		term.write(data);

		// Dispose of the terminal instance on unmount
		return () => term.dispose();
	}, [data]);

	return <div>
		<h3>{label}</h3>
		<div ref={termElement}></div >
	</div>;
}