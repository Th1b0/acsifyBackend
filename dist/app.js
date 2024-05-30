"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./src/errors/errorHandler");
const app_routes_1 = require("./src/app/app.routes");
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
function initMiddleware(app) {
    app.use((0, cookie_parser_1.default)());
    app.set("json spaces", 2);
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: "http://127.0.0.1:5500", // Change this to your frontend URL
        credentials: true, // Enable credentials (cookies) to be sent with the request
    }));
}
initMiddleware(app);
function bundleAllApiRoutes(app) {
    app.use("/api", app_routes_1.appRouter);
}
bundleAllApiRoutes(app);
app.use(errorHandler_1.errorHandler);
app.listen(3000, () => {
    (0, child_process_1.exec)("neofetch", (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
            // log and return if we encounter an error
            console.error("could not execute command: ", err);
            return;
        }
        // log the output received from the command
        console.log(`\n${output}${chalk_1.default.green("Acsify backend op aan starten... \n\n")}${chalk_1.default.blue("Flutter endpoints op aan zetten...\nHtmx endpoints op aan zetten...\n\n")}${chalk_1.default.green("Flutter API ready\nHtmx API ready\n\nBackend online on http://0.0.0.0:3000")}`);
    });
});
