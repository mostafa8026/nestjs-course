import { createConnection } from "typeorm";
import { Employee } from "./Employee";
import { Person } from "./Person";

async function main() {
  try {
    await createConnection({
      type: "mssql",
      host: "localhost\\sql2019",
      port: 1433,
      username: "user1",
      password: "123",
      extra: {
        trustServerCertificate: true,
      },
      database: "typeorm",
      synchronize: true,
      entities: [Person, Employee],
    });

    console.log("database connected");
  } catch (e: any) {
    console.error(e);
    console.log("connection error");
  }
}

main();
