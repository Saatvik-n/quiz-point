import { createServer } from "node:http";
import { router } from "./routes/router.js";

const server = createServer((req, res) => {
    router(req, res)
}).listen(4000)
