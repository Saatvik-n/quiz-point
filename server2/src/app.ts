import { createServer } from "node:http";
import { router } from "./routes/router.js";

const server = createServer(async (req, res) => {
    await router(req, res)
}).listen(4000)
