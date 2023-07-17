// routes/home.ts
import { Router, Context } from "https://deno.land/x/oak@v12.6.0/mod.ts";

const router = new Router();

router.get("/repos", (ctx: Context) => {
    ctx.response.body = "repos";
});


export default router
