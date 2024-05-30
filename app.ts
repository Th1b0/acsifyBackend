import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/errors/errorHandler";
import { appRouter } from "./src/app/app.routes";
import chalk from "chalk";
import { exec } from "child_process";

const app = express();

function initMiddleware(app: Express) {
  app.use(cookieParser());
  app.set("json spaces", 2);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

initMiddleware(app);

function bundleAllApiRoutes(app: Express) {
  app.use("/api", appRouter);
}

bundleAllApiRoutes(app);

app.use(errorHandler);

app.listen(3000, () => {
  exec("neofetch", (err, output) => {
    if (err) {
      console.error("could not execute command: ", err);
      return;
    }
    console.log(
      `\n${output}${chalk.green(
        "Acsify backend op aan starten... \n\n"
      )}${chalk.blue(
        "Flutter endpoints op aan zetten...\nHtmx endpoints op aan zetten...\n\n"
      )}${chalk.green(
        "Flutter API ready\nHtmx API ready\n\nBackend online on http://0.0.0.0:3000"
      )}`
    );
  });
});
