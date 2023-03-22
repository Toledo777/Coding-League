import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home';
import Search from './routes/search';
import Solve from './routes/solve/solve';
import Profile from './routes/profile';
import Setup from './routes/setup';
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
			{ path: '/search', element: <Search /> },
			{ path: '/profile/:username', element: <Profile /> },
			{ path: '/user/setup', element: <Setup /> },
			{ path: '/leaderboard/:option', element: <Leaderboard></Leaderboard> }
		]
	},
], { window });

export default router;