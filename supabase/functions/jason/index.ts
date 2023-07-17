import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import repoRoute from "./routes/repos/repos.ts"
import indexRoute from "./routes/index.ts"
const port = 8000;
const app = new Application();

app.use(indexRoute.routes());
app.use(repoRoute.routes());


app.addEventListener('listen', () => {
  console.log(`Listening on: http://localhost:${port}`);
});

await app.listen({ port });
