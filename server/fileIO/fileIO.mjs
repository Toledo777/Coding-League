import fs from 'fs/promises';

export const allTagsPath = './server/files/all_tags.json';

/**
 * Read a provided file and get its data
 * @param {String} path Path to the file
 * @returns JSON data from the file
 */
export async function readFile(path) {
	if (isValidPath(path)) {
		console.log('valid path!');
		if (isFile(path)) {
			console.log('valid file!');
			try {
				console.log('reading file');
				let fileData = await fs.readFile(path, 'utf-8');
				console.log('file read, parsing data');
				fileData = JSON.parse(fileData);
				console.log('data parsed, returning data');
				return fileData;
			} catch (error) {
				console.log(error);
				return null;
			}
		}
	}
}

/**
 * Verify if a file is truly a file
 * @param {String} path path to the file
 * @returns Boolean based on whether it is a file or not
 */
export async function isFile(path) {
	try {
		let stats = await fs.stat(path);
		return stats.isFile();
	} catch (error) {
		return false;
	}
}

/**
 * Verify the path to a file exists
 * @param {String} path path to the file
 * @returns Boolean based on whether the file exists or not
 */
export async function isValidPath(path) {
	try {
		await fs.access(path);
		return true;
	} catch (error) {
		return false;
	}
}
