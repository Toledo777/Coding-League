import mockingoose from "mockingoose";
import { problem } from "../models/problem.mjs";

mockingoose(problem).toReturn({}, "findOne");

mockingoose(problem).toReturn(new Error("error"), "save");