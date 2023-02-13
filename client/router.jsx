import React from 'react';
import Root from './root';
import Error from './routes/error';
import Home from './routes/home';
import Example from './routes/example';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		errorElement: <Error/>,
		children: [
			{ path: '/', element: <Home/> },
			{ path: '/example', element: <Example/> }
		]
	},
], { window });

export default router;