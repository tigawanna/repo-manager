import axios from "axios";
import { Buffer } from "buffer";

export async function get_repo_jason(owner_repo: string) {
  try {
    // get repository and grab the package.json file and extract its contants into a json responnse
    const local_token = localStorage.getItem("github_token");
    const headersList = {
      Authorization: `bearer ${local_token}`,
    };
    const res = await axios.get<IRawPkgJason | BadDataGitHubError>(
      `https://api.github.com/repos/${owner_repo}/contents/package.json`,
      {
        headers: headersList,
      }
    );
    const data = res.data;
    if (data && "message" in data) {
      return null;
    }
    // //console.log("repo kg json data  == ",data);

    if (data && data.encoding === "base64" && data.content) {
      const stringBuffer = Buffer.from(data.content, data.encoding).toString();
      const pgkjson = (await JSON.parse(stringBuffer)) as DecodedPackageJson;

      const pkg_json = await modifyPackageJson(pgkjson);
      //console.log("pkg json == ", pkg_json);
      return pkg_json;
    }
    return;
  } catch (error) {
    //console.log("error getting package.json", error);
    throw error;
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

export function pkgTypeCondition(pkg: RequiredDecodedPackageJson): {
  pkg_type: TPkgType;
  condition: boolean;
} {
  if (pkg.devDependencies?.rakkasjs) {
    return { pkg_type: "Rakkasjs", condition: true };
  }

  if (pkg.dependencies?.next) {
    return { pkg_type: "Nextjs", condition: true };
  }

  if (pkg.dependencies?.react && pkg.dependencies?.["react-relay"]) {
    return { pkg_type: "React+Relay", condition: true };
  }

  if (pkg.devDependencies?.vite && pkg.dependencies?.react) {
    return { pkg_type: "React+Vite", condition: true };
  }

  if (
    pkg.devDependencies?.nodemon ||
    pkg.dependencies?.nodemon ||
    pkg.dependancies?.express
  ) {
    return { pkg_type: "Nodejs", condition: true };
  }
  return { pkg_type: "Others", condition: false };
}

export async function modifyPackageJson(pgkjson: DecodedPackageJson) {
  if ("name" in pgkjson) {
    const typeCondition = pkgTypeCondition(pgkjson);
    //console.log("typeCondition", typeCondition);
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

export interface TPkgObjValue {
  name: string;
  dependencies: Set<string>;
  // devDependencies:string[]
  count: number;
}
export type DepsComBo =
  | "React + Vite"
  | "React"
  | "Vite"
  | "Rakkasjs"
  | "Nextjs"
  | "Nodejs";
export type TPkgObjs = { [key in DepsComBo]: TPkgObjValue };

export type TPkgType =
  | "React+Vite"
  | "React+Relay"
  | "Rakkasjs"
  | "Nextjs"
  | "Nodejs"
  | "Others";

export const pkgTypesArr = [
  "React+Vite",
  "React+Relay",
  "Rakkasjs",
  "Nextjs",
  "Nodejs",
  "Others",
] as const;

export interface IRawPkgJason {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: RawPkgJasoLinks;
}

export interface RawPkgJasoLinks {
  self: string;
  git: string;
  html: string;
}

export type KeyStringObject = { [key: string]: string };

export interface RequiredDecodedPackageJson {
  name: string;
  private?: boolean;
  version: string;
  type?: string;
  scripts: KeyStringObject;
  dependencies: KeyStringObject;
  devDependencies: KeyStringObject;
  [key: string]: any | undefined;
}

export type DecodedPackageJson = RequiredDecodedPackageJson & {
  favdeps?: string[];
  pkg_type?: TPkgType;
};

export interface BadDataGitHubError {
  message: string;
  documentation_url: string;
}
