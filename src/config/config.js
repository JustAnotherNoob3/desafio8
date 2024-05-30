import dotenv from 'dotenv';
dotenv.config();
console.log("Hey: " + process.argv[2]);
export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.SESSION_SECRET,
    daoType: process.argv[2]
}