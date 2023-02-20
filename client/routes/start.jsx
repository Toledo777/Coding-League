import React from 'react';
import { useState, useEffect } from 'react';
import Problem from '../components/problem';

export default function Start() {
	const [solution, setSolution] = useState('');
	const [problem, setProblem] = useState({
		_id: '',
		title: '',
		url: '',
		desc: '',
		input: '',
		output: '',
		test_cases: [],
		mem_limit: 0,
		time_limit: 0,
		notes:''});
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
		let prob_id = '233B';
		let prob_name = 'B. Non-Square Equation';
		let prob_url = 'https://codeforces.com/contest/233/problem/B';
		let prob_desc = 'Let\'s consider equation:\n\nx2 + s(x)·x - n = 0, \nwhere x, n are positive integers, s(x) is the function, equal to the sum of digits of number x in the decimal number system.\n\nYou are given an integer n, find the smallest positive integer root of equation x, or else determine that there are no such roots.';
		let input = 'A single line contains integer n (1 ≤ n ≤ 1018) — the equation parameter.\n\nPlease, do not use the %lld specifier to read or write 64-bit integers in С++. It is preferred to use cin, cout streams or the %I64d specifier.';
		let output = 'Print -1, if the equation doesn\'t have integer positive roots. Otherwise print such smallest integer x (x > 0), that the equation given in the statement holds.';
		let cases = [
			{input: 2, output: 1},
			{input: 110, output: 10},
			{input: 4, output: -1}
		];
		let mem = 3;
		let time = 1;
		let notes = 'In the first test case x = 1 is the minimum root. As s(1) = 1 and 12 + 1·1 - 2 = 0.\n\nIn the second test case x = 10 is the minimum root. As s(10) = 1 + 0 = 1 and 102 + 1·10 - 110 = 0.\n\nIn the third test case the equation has no roots.';

		// update problem state
		setProblem({
			_id: prob_id,
			title: prob_name,
			url: prob_url,
			desc: prob_desc,
			input: input,
			output: output,
			test_cases: cases,
			mem_limit: mem,
			time_limit: time,
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
			{/* <Problem className='title' range='5'/> */}
			<h1 className='title'>Proglem {problem._id}: {problem.title}</h1>
			<div className='instructions' style={{ whiteSpace: 'pre-line' }}>{problem.desc}</div>
			<div className='input' style={{ whiteSpace: 'pre-line' }}>{'\n'}<b>Input:</b> {problem.input}</div>
			<div className='output' style={{ whiteSpace: 'pre-line' }}>{'\n'}<b>Output:</b> {problem.output}</div>
			<div className='limits' style={{ whiteSpace: 'pre-line' }}>Memory limit: {problem.mem_limit}, Time limit: {problem.time_limit}</div>
			<div className='notes' style={{ display: 'none', whiteSpace: 'pre-line' }}>Notes: {problem.notes}</div>
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
			<table className='test-cases'>
				<tbody>
					<tr className='tab-headers'>
						<th>Input</th>
						<th>Output</th>
						<th>Result</th>
					</tr>
					<tr className='case-1'>
						<td>{problem.test_cases[0]?.input}</td>
						<td>{problem.test_cases[0]?.output}</td>
						<td><img className='res-img-1' /></td>
					</tr>
					<tr className='case-2'>
						<td>{problem.test_cases[1]?.input}</td>
						<td>{problem.test_cases[1]?.output}</td>
						<td><img className='res-img-2' /></td>
					</tr>
					<tr className='case-3'>
						<td>{problem.test_cases[2]?.input}</td>
						<td>{problem.test_cases[2]?.output}</td>
						<td><img className='res-img-3' /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className='after-running' style={{ visibility: 'hidden' }}>
			<p className='completed'></p>
			<button className='next' style={{ display: 'none' }}>Next problem</button>
			<button className='skip'>Skip problem</button>
		</div>
	</div>;
}