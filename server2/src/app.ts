import { createServer } from "node:http";

const server = createServer((req, res) => {
    res.write("Hi")
    res.end()
}).listen(4000)

process.on('SIGINT', (signal) => {
    server.close()
    process.exit()
})