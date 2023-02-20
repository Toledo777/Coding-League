import React from 'react';
import { useState, useEffect } from 'react';
import Problem from '../components/problem';

export default function Start() {
	const [solution, setSolution] = useState('');
	const [problem, setProblem] = useState({problem: '', input: '', output: '', notes:''});
	const [codeStatus, setCodeStatus] = useState({running: false, correct: false});

	/**
	 * useEffect to load problem upon first page load
	 */
	useEffect(() => {
		loadProblem();
	}, []);

	/**
	 * method to manually load a problem
	 * first used by useEffect on first page load
	 * used whenever a problem is completed/skipped to load the next one
	 */
	function loadProblem() {
		// sample problem information (replace with full dynamic problem fetching from API)
		let problem = 'Write a method that takes in a String, determines if the string is a palindrome or not, and finally outputs a Boolean result.';
		let input = 'String';
		let output = 'Boolean';
		let notes = 'Some notes go here';

		// update problem state
		setProblem({
			problem: problem,
			input: input,
			output: output,
			notes: notes
		});

		// some problems have additional notes, some don't, hide/show element accordingly
		if (problem.notes !== ''){
			document.querySelector('.notes').style.display = 'inline';
		} else {
			document.querySelector('.notes').style.display = 'none';
		}
	}

	// update textArea when typing
	/**
	 * update textArea as user types
	 * @param {Object} event 
	 */

	function handleSolutionChange(event) {
		setSolution(event.target.value);
	}

	// Button to clear textArea
	/**
	 * clear textArea on "clear" button press
	 */
	function clearSolution() {
		setSolution('');
	}

	/**
	 * grab text from textArea (to be replaced with proper IDE)
	 * simulate running code using timeout promises to mimick the code taking time to run
	 * update page with post-execution stats (test case completion, passed/failed, etc.)
	 */
	async function runSolution() {
		let solution = document.querySelector('.solution').textContent;

		// user actually entered something
		if (solution !== ''){
			// there isn't any code currently running already
			if (!codeStatus.running) {
				// code is now running, update test case results as code results come in
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
				// code is currently already running
				console.log('Existing solution already running, wait until it\'s done!!!');
			}
			// show post-execxution results
			document.querySelector('.after-running').style.visibility = 'visible';
			if (!codeStatus.correct) {
				// failed problem
				document.querySelector('.completed').textContent = 'Test cases failed!';
			} else {
				// solved problem
				document.querySelector('.completed').textContent = 'All test cases passed!';
				document.querySelector('.skip').style.display = 'none';
				document.querySelector('.next').style.display = 'inline';
			}
		} else {
			// no input in textArea (or the "IDE")
			alert('No code provided!');
		}
	}

	return <div>
		<h1>Coding Problem</h1>
		<div className='problem'>
			<Problem className='title' range='5'/>
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