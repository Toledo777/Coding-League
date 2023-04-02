import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home/home';
import Search from './routes/search/search';
import Solve from './routes/solve/solve';
import History from './routes/history';
import Profile from './routes/profile';
import { createBrowserRouter } from 'react-router-dom';
import Leaderboard from './routes/leaderboard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/solve/:id', element: <Solve /> },
			{ path: '/profile/:id', element: <Profile /> },
			{ path: '/search', element: <Search /> },
			{path: '/history', element: <History />},
			{ path: '/leaderboard/', element: <Leaderboard /> }
		]
	},
], { window });

export default router;