
import { logError } from "../../../utils/loggers.ts";
import { RequiredDecodedPackageJson,TPkgType,DecodedPackageJson } from "./types.ts";
import { pkgTypeCondition } from "./whatFramework.ts";


// pass in the repo nameWithOwner and the viewer token and get the package.json back

export async function getOneRepoPackageJson(owner_repo: string, viewer_token: string) {
    try {
        const headersList = {
            Authorization: `bearer ${viewer_token}`,
        };
        const response = await fetch(
            `https://api.github.com/repos/${owner_repo}/contents/package.json`,
            {
                method: "GET",
                headers: headersList,
            }
        );

        const data = await response.json();

        if (data && data.encoding === "base64" && data.content) {
            const stringBuffer = atob(data.content);
            const pgkjson = JSON.parse(stringBuffer) as DecodedPackageJson;
            return await modifyPackageJson(pgkjson);
        }

        return data as DecodedPackageJson;
    } catch (error) {
        logError("error getOneRepoPackageJson  ", error.message);
        return error as DecodedPackageJson;
    }
}




export const mostFaveDepsList = [
    "tailwindcss",
    "supabase",
    "typescript",
    "react-router-dom",
    "react-icons",
    "firebase",
    "dayjs",
    "axios",
    "socket.io",
    "pocketbase",
    "react-to-print",
    "react-query",
    "rollup",
    "express",
    "graphql",
    "jest",
    "vitest",
    "nodemon",
];

//  modify package.json to addthe pkg_type
export function modifyPackageJson(pgkjson: DecodedPackageJson) {
    if ("name" in pgkjson) {
        const typeCondition = pkgTypeCondition(pgkjson);
        console.log("typeCondition", typeCondition);
        pgkjson["pkg_type"] = typeCondition.pkg_type;

        const alldeps = Object.keys(pgkjson.dependencies)
            .map((key) => {
                return key.split("^")[0];
            })
            .concat(
                Object.keys(pgkjson.devDependencies).map((key) => {
                    return key.split("^")[0];
                })
            );

        const favdeps = mostFaveDepsList.filter((key) => {
            return alldeps.find((dep) => {
                return dep === key;
            });
        });

        pgkjson["favdeps"] = favdeps;
        return pgkjson;
    }
    return pgkjson;
}

