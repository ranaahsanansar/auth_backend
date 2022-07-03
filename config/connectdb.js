import mongoose from 'mongoose';

const connectDb = async (DATABASE_URL) =>{
    try {
        const DB_OPTIONS = {
            dbName: 'auth-sys-asn'
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("DB Connected");
    } catch (error) {
        console.log(error); 
    }
}

export default connectDb;