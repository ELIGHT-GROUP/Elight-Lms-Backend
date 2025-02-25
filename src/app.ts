import { Hono } from "hono";
import { logger } from "hono/logger";
import "dotenv/config";
import Routers from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { DatabaseService } from "./services/database.service";

const app = new Hono();

app.use(logger());
app.onError(errorHandler);
app.route("/api/v1", Routers);

async function bootstrap() {
  try {
    await DatabaseService.getInstance().connect();

    process.on("SIGINT", async () => {
      await DatabaseService.getInstance().disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await DatabaseService.getInstance().disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}

bootstrap();

export default app;
