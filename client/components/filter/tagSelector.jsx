import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

export default function TagSelector({ tagsChange }) {
	const [error, loading, allTags] = useFetch('/api/allTags', []);

	let [tags, setTags] = useState([]);
	let [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => tagsChange(tags), [tags]);

	const removeTag = tag => {
		setTags(tags.filter(item => item !== tag));
	};

	const addTag = tag => {
		if (!tags.includes(tag)) {
			setTags([...tags, tag]);
		}
	};

	return <div className='tag_selector'>
		<div className='selected'>
			{tags.map(tag => <button className='tag' key={tag}
				onClick={() => removeTag(tag)}>{tag}</button>
			)}
		</div>
		<button className='tag' key={'add tag'} onClick={() => setMenuOpen(true)}>+ tag</button>
		{
			menuOpen && <>
				<span className='close_click_catcher' onClick={() => setMenuOpen(false)} />
				<div className='add_tag_modal panel'>
					{loading && 'loading'}
					{error && error}
					{
						allTags.filter(t => !tags.includes(t)).map(
							tag => <button
								className='tag'
								onClick={
									() => { addTag(tag); setMenuOpen(false); }
								}
								key={tag}>{tag}
							</button>
						)
					}
				</div>
			</>
		}
	</div>;
}
