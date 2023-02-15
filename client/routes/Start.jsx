import React from 'react';
import { useState, useEffect } from 'react';
// import incorrect from '../public/assets/incorrect.png';
// import correct from '../public/assets/correct.png';

export default function Start() {
	const [solution, setSolution] = useState('');
	const [isRunning, setIsRunning] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		loadProblem();
	});

	function loadProblem() {
		document.querySelector('.instructions').textContent = 'Proglem: write a method that takes in a String, determines if the string is a palindrome or not, and finally outputs a Boolean result.';
		document.querySelector('.input').textContent = 'Input: String';
		document.querySelector('.output').textContent = 'Output: Boolean';
	}

	function handleSolutionChange(event) {
		setSolution(event.target.value);
	}

	function clearSolution() {
		setSolution('');
	}

	async function runSolution() {
		if (!isRunning) {
			setIsRunning(true);
			console.log('Running solution...');
			await new Promise(r => setTimeout(r, 500));
			document.querySelector('.res-img-1').src = 'assets/incorrect.png';
			await new Promise(r => setTimeout(r, 1500));
			document.querySelector('.res-img-2').src = 'assets/incorrect.png';
			await new Promise(r => setTimeout(r, 300));
			document.querySelector('.res-img-3').src = 'assets/correct.png';
			await new Promise(r => setTimeout(r, 100));
			setIsRunning(false);
			console.log('done!');
			setIsCorrect(false);
		} else {
			console.log('Existing solution already running, wait until it\'s done!!!');
		}
		document.querySelector('.after-running').style.visibility = 'visible';
		if (!isCorrect) {
			document.querySelector('.completed').textContent = 'Test cases failed!';
		} else {
			document.querySelector('.completed').textContent = 'All test cases passed!';
			document.querySelector('.skip').style.display = 'none';
			document.querySelector('.next').style.display = 'inline';
		}
	}

	return <div>
		<h1>Coding Problems</h1>
		<div className='problem'>
			<h2>Problem #1</h2>
			<div className='instructions'></div>
			<div className='input'></div>
			<div className='output'></div>
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
					<h2 className='expected-1'>racecar (true): <img className='res-img-1' /></h2>
				</div>
				<div className='case-2'>
					<h2 className='expected-2'>kayak (true): <img className='res-img-2' /></h2>
				</div>
				<div className='case-3'>
					<h2 className='expected-3'>palindrome (false): <img className='res-img-3' /></h2>
				</div>
			</div>
		</div>
		<div className='after-running' style={{visibility: 'hidden'}}>
			<p className='completed'></p>
			<button className='next' style={{display: 'none'}}>Next problem</button>
			<button className='skip'>Skip problem</button>
		</div>
	</div>;
}