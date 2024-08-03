import mongoose from 'mongoose'


export const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => { console.log("DB Connection Successfull") })
    .catch((error) => { 
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    })
}
