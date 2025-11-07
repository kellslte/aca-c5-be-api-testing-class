import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/awesome_users_collections";

async function initialiseDatabaseConnection() {
    try {
        mongoose.connect(uri);
        mongoose.connection.on('connected', () => {
            console.info('Database connection established')
        })
    } catch (err) {
        console.error(err);
    }
}

export { initialiseDatabaseConnection };