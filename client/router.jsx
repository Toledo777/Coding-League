import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home';
import Solve from './routes/solve/solve';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/solve/:id', element: <Solve /> }
		]
	},
], { window });

export default router;