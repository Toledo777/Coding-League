import * as fs from 'fs/promises';


async function rawRecursiveWatch(path, onChange) {

	await fs.readdir(path)
		.then(async children => {
			children.forEach(child => recursiveWatch(`${path + '/' + child}`, onChange));
			for await (let change of fs.watch(path)) { // eslint-disable-line
				onChange();
			}
		})
		.catch(() => { });
}

// Watches a given directory for changes recursively.
export async function recursiveWatch(path, onChange, delay = 500) {
	let timeout = 0;
	rawRecursiveWatch(path, () => {
		clearTimeout(timeout);
		timeout = setTimeout(onChange);
	}, delay);
}

// Recursively copies a directory
export async function recursiveCopy(from, to) {
	await fs.cp(from, to, { recursive: true });
}
