import { IPkgJson } from "../../../utils/types/pkgJson.ts";

function determineFramework(packageJson:IPkgJson): string | null {
    const dependencies = packageJson.dependencies || {};

    if (dependencies["next"] && dependencies["react"]) {
        return "Next.js";
    }

    if (dependencies["vite"] && dependencies["react"]) {
        return "Vite";
    }

    if (dependencies["create-react-app"]) {
        return "Create React App";
    }

    if (dependencies["@angular/core"]) {
        return "Angular";
    }

    if (dependencies["vue"]) {
        return "Vue.js";
    }

    if (dependencies["solid-js"]) {
        return "Solid";
    }

    if (dependencies["qwik"]) {
        return "Qwik";
    }

    if (dependencies["remix"]) {
        return "Remix";
    }

    if (dependencies["rakkas"]) {
        return "Rakkas";
    }

    if (dependencies["redwood"]) {
        return "Redwood";
    }

    if (dependencies["svelte"]) {
        return "Svelte";
    }

    if (dependencies["nuxt"]) {
        return "Nuxt.js";
    }

    if (dependencies["ember-source"]) {
        return "Ember";
    }

    if (dependencies["backbone"]) {
        return "Backbone";
    }

    if (dependencies["jquery"]) {
        return "jQuery";
    }

    // Add more conditions for other frameworks here

    return null; // If no framework is detected
}
