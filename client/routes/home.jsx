import { GoogleLogin } from '@react-oauth/google';
import React from 'react';

export default function Home() {
	return (
		<div>
			<GoogleLogin/>
			<h1>Home!</h1>
		</div>
	);
}