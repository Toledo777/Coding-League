import React from 'react';
import Board from '../components/leaderboards/leaderboardGlobal';
import SplitPane from '../components/splitPane/splitPane';
//import { useParams } from 'react-router-dom';

export default function Leaderboard() {

	return (
		<SplitPane labels={['global', 'current']}>
			<Board global={'global'}></Board>
			<Board global={'current'}></Board>
		</SplitPane>
	);
}