import mongoose from "mongoose";

const userSchema = {
    email: String,
    username: String,
    avatar_uri: String,
    wins: Number,
    loss: Number,
    rank: String
}

export var user = mongoose.model("user", userSchema)
