import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        let mongoURI;

        if(process.env.NODE_ENV === 'test') {
            mongoURI = process.env.MONGO_DB_URI_TEST;
        } else {
            mongoURI = process.env.MONGO_DB_URI_DEV;
        }
        await mongoose.connect(mongoURI);
        console.log('Connection to database successful.');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
};

export default connectToMongoDB;