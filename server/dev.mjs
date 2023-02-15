// Developement server

import { watch } from '../build/utils.mjs';
import app from './app.mjs';
import dbConnect from './db/database.mjs';
import { problem } from './db/models.mjs';

const PORT = 8080;

await dbConnect();

// test insertion, should not be in production
// const t = new problem;
// t.id = 1;
// t.url = "testurl";
// t.title = "testtitle";
// t.time_limit = 1;
// t.memory_limit = 1;
// t.description = "hello";
// t.input_specification = "Test";
// t.output_specification = "test";
// t.sample_tests = "test";
// t.test_cases = [{input: "Test", output: "test output"}];
// t.tags = ["tag1", "Tag2"];
// t.save();

app.listen(PORT, () => {
	console.log(`Development server listening at http://localhost:${PORT}`);
});

// Rebuild on source change
// DEV MODE ONLY
await watch();

