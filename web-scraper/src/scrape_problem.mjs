
export default async function scrapeProblem(browser, url) {
    console.time(url)
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(url);

    const problem = await page.$(".problem-statement")

    const title = await problem.$eval(".title", (el => el.textContent));
    // Getting the 1st index will be the corresponding text node, not the label
    const time_limit = await problem.$eval(".time-limit", (el => el.childNodes[1].textContent));
    const memory_limit = await problem.$eval(".memory-limit", (el => el.childNodes[1].textContent));
    const input_type = await problem.$eval(".input-file", (el => el.childNodes[1].textContent));
    const output_type = await problem.$eval(".output-file", (el => el.childNodes[1].textContent));

    // Extract an ID from the URL
    const parseId = (url) => {
        const parts = url.split("/");
        let [b, a] = [parts.pop(), parts.pop()];
        return `${a}${b}`;
    }

    const content = await page.$$eval(".problem-statement > div", elms => elms.map(
        (elm) => {
            // The div with no classes is the description
            let _class = elm.className || "description";
            // JSON does not like `-`
            _class = _class.replaceAll("-", "_");
            return { [_class]: elm.innerHTML };
        }
    ))

    let id = parseId(url);
    console.timeEnd(url);

    await page.close()

    return Object.assign({ id, url, title, time_limit, memory_limit, input_type, output_type }, ...content);
}