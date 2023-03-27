import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home/home';
import Search from './routes/search/search';
import Solve from './routes/solve/solve';
import Profile from './routes/profile';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/solve/:id', element: <Solve /> },
			{ path: '/search', element: <Search /> },
			{ path: '/profile/:username', element: <Profile /> }
		]
	},
], { window });

export default router;