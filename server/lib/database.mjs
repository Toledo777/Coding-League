import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cachegoose from 'recachegoose';
dotenv.config();

// database url
const mongoDB = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);

cachegoose(mongoose, {
	engine: 'memory'
});

// database connection function
async function dbConnect() {
	// check if ATLAS_URI exist
	if (!mongoDB) {
		console.log('Error: Please add ATLAS_URI to .env file');
		console.log(mongoDB);
		process.exit();
	}
	else {
		try {
			// connect with URI
			await mongoose.connect(mongoDB);
			console.log('Connected to database');
		}
		catch (error) {
			console.log('Error: Couldn\'t connect');
			process.exit();
		}
	}
}

export default dbConnect;
