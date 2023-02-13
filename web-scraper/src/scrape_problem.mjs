
export default async function scrapeProblem(browser, url) {
	console.time(url);
	const page = await browser.newPage();
	await page.setViewport({ width: 1080, height: 1024 });
	await page.goto(url);

	const problem = await page.$('.problem-statement');
	console.log(url);
	const title = await problem.$eval('.title', (el => el.textContent));
	// Getting the 1st index will be the corresponding text node, not the label
	let time_limit = await problem.$eval('.time-limit', (el => el.childNodes[1].textContent));
	let memory_limit = await problem.$eval('.memory-limit', (el => el.childNodes[1].textContent));
	const tags = await page.$$eval('.tag-box', (el => el.map(el => el.textContent)));

	// Extract an ID from the URL
	const parseId = (url) => {
		const parts = url.split('/');
		let [b, a] = [parts.pop(), parts.pop()];
		return `${a}${b}`;
	};

	const content = await page.$$eval('.problem-statement > div', elms => elms.map(
		(elm) => {
			// The div with no classes is the description
			let _class = elm.className || 'description';
			// JSON does not like `-`
			_class = _class.replaceAll('-', '_');
			return { [_class]: elm.innerHTML };
		}
	));

	const id = parseId(url);

	// Always in MB
	memory_limit = Number(memory_limit.split(' ')[0]);
	// Always in seconds 
	time_limit = Number(time_limit.split(' ')[0]);

	console.timeEnd(url);

	await page.close();

	// Combine content and metadata into single flat object
	return Object.assign({ id, url, title, time_limit, memory_limit, tags }, ...content);
}