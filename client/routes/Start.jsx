import React from 'react';

export default function Start() {
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
			<form className='form'>
				<div className='form-input'>
					<textarea className='solution' rows='15' cols='60'>

					</textarea>
				</div>
				<div className='form-buttons'>
					<button className='run'>Run</button>
					<button className='clear'>Clear</button>
				</div>
			</form>
		</div>
	</div>;
}