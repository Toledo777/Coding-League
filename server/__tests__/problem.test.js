import mockingoose from "mockingoose";
import { problem } from "../models/problem.mjs";

describe("test mongoose problem model", () => {
    it("should return the problem with findById", async () => {
        const _prob = {
            _id: "2F18",
            title: "What is that noise in the ceiling",
            url: "https://www.dawsoncollege.qc.ca",
            tags: ["School", "Impossible"],
            test_cases: [{input: "hello", output: "world"}]
        } 

        mockingoose(problem).toReturn(_prob, "findOne");
        let actualProblem = await problem.findById({_id: "2F18"});
        return expect(JSON.parse(JSON.stringify(actualProblem))).toMatchObject(_prob);
    });
});

