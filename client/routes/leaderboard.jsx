import React from 'react';
import Board from '../components/leaderboards/leaderboardGlobal';
import { useParams } from 'react-router-dom';

export default function Leaderboard() {
	const params = useParams();
	let { option } = params;



	return (
		<div>
			<Board global={option}></Board>
		</div>
	);
}