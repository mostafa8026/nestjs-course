import { createConnection, Migration } from "typeorm";

async function main() {
  const connection = await createConnection({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "vhdhk123!@#",
    database: "decodl_old",
    extra: {
      trustServerCertificate: true,
    },
  });

  console.log("connection created");
}

main();
