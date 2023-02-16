import React from 'react';
import { useState, useEffect } from 'react';
import Problem from '../components/problem';

export default function Start() {
	const [solution, setSolution] = useState('');
	const [problem, setProblem] = useState({problem: '', input: '', output: '', notes:''});
	const [codeStatus, setCodeStatus] = useState({running: false, correct: false});

	// Load a problem upon first page load
	useEffect(() => {
		loadProblem();
	}, []);

	// Can reuse method to load additional problems when the next/skip button is pressed
	function loadProblem() {
		let problem = 'Write a method that takes in a String, determines if the string is a palindrome or not, and finally outputs a Boolean result.';
		let input = 'String';
		let output = 'Boolean';
		let notes = 'Some notes go here';

		setProblem({
			problem: problem,
			input: input,
			output: output,
			notes: notes
		});

		// Check if the current problem has any notes associated with it, show notes section if yes
		if (problem.notes !== ''){
			document.querySelector('.notes').style.display = 'inline';
		} else {
			document.querySelector('.notes').style.display = 'none';
		}
	}

	// Update textArea when typing
	function handleSolutionChange(event) {
		setSolution(event.target.value);
	}

	// Button to clear textArea
	function clearSolution() {
		setSolution('');
	}

	// Select text from textArea, simulate running code for now with timeout promises, show post-execution status
	async function runSolution() {
		let solution = document.querySelector('.solution').textContent;
		if (solution !== ''){
			if (!codeStatus.running) {
				setCodeStatus(codeStatus.running = true);
				console.log('Running solution...');
				await new Promise(r => setTimeout(r, 500));
				document.querySelector('.res-img-1').src = 'assets/incorrect.png';
				await new Promise(r => setTimeout(r, 1500));
				document.querySelector('.res-img-2').src = 'assets/incorrect.png';
				await new Promise(r => setTimeout(r, 300));
				document.querySelector('.res-img-3').src = 'assets/correct.png';
				await new Promise(r => setTimeout(r, 100));
				setCodeStatus(codeStatus.running = false);
				console.log('done!');
				setCodeStatus(codeStatus.correct = false);
			} else {
				console.log('Existing solution already running, wait until it\'s done!!!');
			}
			document.querySelector('.after-running').style.visibility = 'visible';
			if (!codeStatus.correct) {
				document.querySelector('.completed').textContent = 'Test cases failed!';
			} else {
				document.querySelector('.completed').textContent = 'All test cases passed!';
				document.querySelector('.skip').style.display = 'none';
				document.querySelector('.next').style.display = 'inline';
			}
		} else {
			alert('No code provided!');
		}
	}

	return <div>
		<h1>Coding Problem</h1>
		<div className='problem'>
			<Problem range='5'/>
			<div className='instructions'>Proglem: {problem.problem}</div>
			<div className='input'>Input: {problem.input}</div>
			<div className='output'>Output: {problem.output}</div>
			<div className='notes' style={{display: 'none'}}>Notes: {problem.notes}</div>
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