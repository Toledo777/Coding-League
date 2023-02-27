import * as fs from 'fs/promises';

async function rawRecursiveWatch(path, onChange) {
	let children = await fs.readdir(path);

	children.forEach(async (child) => {
		const childPath = `${path}/${child}`;
		if ((await fs.lstat(childPath)).isDirectory()) {
			recursiveWatch(childPath, onChange);
		}
	});

	// eslint-disable-next-line
	for await (let change of fs.watch(path)) {
		onChange();
	}
}

// Watches a given directory for changes recursively.
export async function recursiveWatch(path, onChange, delay = 100) {
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
