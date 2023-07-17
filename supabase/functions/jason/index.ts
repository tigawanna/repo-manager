import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { repoRouter } from "./routes/repos/repos.ts";
import { indexRouter } from "./routes/index.ts";
import { pkgJsonRouter } from "./routes/repos/get-pkg-json.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const port = 8000;
const app = new Application();


const router = new Router();

router
  .use("/", indexRouter.routes())
  .use("/repos",repoRouter.routes())
  .use("/pkg",pkgJsonRouter.routes())

app.use(router.routes());


app.addEventListener('listen', () => {
  console.log(`Listening on: http://localhost:${port}`);
});

await app.listen({ port });
