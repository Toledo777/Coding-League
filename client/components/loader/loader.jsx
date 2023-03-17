import React, { useEffect, useState } from 'react';

const textStates = [
	'_          ',
	'L_         ',
	'Lo_        ',
	'Lod_       ',
	'Lodi_      ',
	'Lod_       ',
	'Lo_        ',
	'Loa_       ',
	'Load_      ',
	'Loadi_     ',
	'Loadin_    ',
	'Loading_   ',
	'Loading._  ',
	'Loading.._ ',
	'Loading..._',
];

export default function Loading() {
	const [frame, setFrame] = useState(0);

	useEffect(() => {
		const i = setInterval(() => {
			setFrame((frame) => (frame + 1) % textStates.length);
		}, 200);
		return () => clearInterval(i);
	}, []);

	return <div className="loader">
		<svg viewBox="0 0 80 20" fill="white" fontWeight={'bold'} fontFamily='monospace'>
			<text x="0" y="15">{textStates[frame]}</text>
		</svg>
	</div >;
}