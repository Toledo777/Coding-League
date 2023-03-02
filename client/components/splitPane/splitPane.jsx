import React, { useState } from 'react';
import './splitPane.css';

// The labels must be supplied in the same order they appear in the elements 
export default function SplitPane({ labels, children }) {
	const [selected, setSelected] = useState(0);

	return <div className='split-pane'>
		<div className='pane-selector'>{
			labels.map((label, index) => {
				return <button
					key={label}
					className={(selected == index ? 'selected ' : '') + 'pane-button'}
					onClick={() => setSelected(index)}
				>{label}</button>;
			})
		}
		</div>
		<div className='pane-content'>
			{children[selected]}
		</div>
	</div>;
}
