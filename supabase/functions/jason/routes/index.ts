import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";

const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = 'Received a GET HTTP method';
});

router.post('/', (ctx) => {
    ctx.response.body = 'Received a POST HTTP method';
});

router.put('/', (ctx) => {
    ctx.response.body = 'Received a PUT HTTP method';
});

router.delete('/', (ctx) => {
    ctx.response.body = 'Received a DELETE HTTP method';
});

export default router
