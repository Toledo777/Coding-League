import React from 'react';
import { useState } from 'react';
// import incorrect from '../public/assets/incorrect.png';
// import correct from '../public/assets/correct.png';

export default function Start() {
	const [solution, setSolution] = useState('');
	const [running, setRunning] = useState(false);

	function handleSolutionChange(event) {
		setSolution(event.target.value);
	}

	function clearSolution(){
		setSolution('');
	}

	function runSolution(){
		if(!running){
			console.log(solution);
			console.log('Running solution...');
			setRunning(true);
			setTimeout(() => { 
				// console.log(incorrect);
				document.querySelector('.res-img-1').src = 'assets/incorrect.png';
				document.querySelector('.res-img-2').src = 'assets/incorrect.png';
				document.querySelector('.res-img-3').src = 'assets/correct.png';
			}, 5000);
			setRunning(false);
		} else {
			console.log('Existing solution already running, wait until it\'s done!!!');
		}
	}

	return <div>
		<h1>Coding Problems</h1>
		<div className='problem'>
			<h2>Problem #1</h2>
			<div>Proglem: write a method that takes in a String, determines if the string is a palindrome or not, and finally outputs a Boolean result.</div>
			<div><b>Input:</b> (1) String</div>
			<div><b>Output:</b> (1) Boolean</div>
		</div>
		<div><p></p></div>
		<div className='form-div'>
			<div className='form-input'>
				<textarea className='solution' rows='15' cols='60' onChange={handleSolutionChange} value={solution}>
				</textarea>
			</div>
			<div className='form-buttons'>
				<button className='run' onClick={runSolution}>Run</button>
				<button className='clear' onClick={clearSolution}>Clear</button>
			</div>
		</div>
		<div className='status'>
			<h2 className='status-text'></h2>
		</div>
		<div className='results'>
			<div className='test-cases'>
				<div className='case-1'>
					<h2 className='expected-1'>racecar (true): </h2>
					<img className='res-img-1'/>
				</div>
				<div className='case-2'>
					<h2 className='expected-2'>kayak (true): </h2>
					<img className='res-img-2'/>
				</div>
				<div className='case-3'>
					<h2 className='expected-3'>palindrome (false): </h2>
					<img className='res-img-3'/>
				</div>
			</div>
		</div>
	</div>;
}