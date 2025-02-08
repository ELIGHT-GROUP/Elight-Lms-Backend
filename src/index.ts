import app from "./app";
import "dotenv/config";

const port = process.env.PORT || 3000; 

Bun.serve({
    port,
    fetch: app.fetch
});