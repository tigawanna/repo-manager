//  get repo package json 

import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { getOneRepoPackageJson } from "./helpers/pkg-json-helpers.ts";
import { logInfo } from "../../utils/loggers.ts";

export const pkgJsonRouter = new Router();
pkgJsonRouter
    .get("/", async (ctx) => {
    try {
      const authHeader = ctx.request.headers.get("Authorization");
      const searchParams = new URLSearchParams(ctx.request.url.search);
      const nameWithOwner = searchParams.get("nwo");

      if (authHeader) {
        const [authType, token] = authHeader.split(" ");
        if (!nameWithOwner) {
          ctx.response.status = 401;
          ctx.response.body = "required nwo search param missing";
          return;
        }
        if (authType === "Bearer") {
          const pkg_json = await getOneRepoPackageJson(nameWithOwner, token);
          ctx.response.headers.set("Content-Type", "application/json");
          ctx.response.status = 200;
          ctx.response.body = pkg_json;
          return;
        }
      }
      ctx.response.status = 401;
      ctx.response.body = "reponse";
    } catch (error) {
      logInfo("error getting pkg-json", error);
      ctx.response.status = 500;
      ctx.response.body = error;

    }
  })


