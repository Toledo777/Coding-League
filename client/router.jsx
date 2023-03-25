import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home';
import Search from './routes/search';
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
			{ path: '/profile/:id', element: <Profile /> },
			{ path: '/search', element: <Search /> },
		]
	},
], { window });

export default router;