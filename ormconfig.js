import dotenv from 'dotenv';
dotenv.config();

export default {
  type: "mysql",
  host: process.env.HOSTNAME,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ["./src/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/migrations",
  },
  entities: ["./src/entities/*.ts"],
};
