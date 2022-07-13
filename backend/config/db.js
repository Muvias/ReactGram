const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

async function connect() {
    try {
        const dbConnect = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.thfeuil.mongodb.net/?retryWrites=true&w=majority`);

        console.log("Conectou ao banco");

        return dbConnect;
    } catch (err) {
        console.log(err);
    }
}

connect();

module.exports = connect;
