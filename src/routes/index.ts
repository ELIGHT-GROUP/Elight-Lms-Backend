import { Hono } from "hono";

import auth from "./auth";

const Routers = new Hono();

Routers.route("/auth", auth);

export default Routers;
