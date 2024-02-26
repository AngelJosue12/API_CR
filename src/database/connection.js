import sql from "mssql";
//import config from "../config";

 const dbSettings = {
 // user: config.dbUser,
  //password: config.dbPassword,
 // server: config.dbServer,
 // database: config.dbDatabase,
 user: 'cruzroja',
 password: '@ng3l_2021',
 server: 'localhost',
 database: 'cruz_roja',
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};



export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
 } catch (error) {
    console.error(error);
  }
};
 
export { sql };
