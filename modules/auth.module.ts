import { defineNuxtModule, logger } from "@nuxt/kit";
import { hash } from "ohash";
import { defu } from "defu";

type Routes = ["login", "register", "logout", "me"];

export interface ModuleOptions {
    secret: string;
    exclude?: Array<Routes[number]>;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: "nuxt-mongo-auth",
        compatibility: {
            nuxt: "^3.0.0",
            bridge: false,
        },
        configKey: "mongoAuth",
    },
    defaults: {
        secret: process.env.MONGO_SECRET as string,
        exclude: [],
    },
    async setup(options, nuxt) {
        const config = nuxt.options.runtimeConfig;
        const secret =
            options.secret || hash(`${Date.now()}${Math.random()}`.slice(0, 32));

        if (!options.secret) {
            //TODO: find out why this can trigger.
            //console.log("You triggered the false options.secret");
        }
        config.auth = defu(config.auth || {}, {
            mongo: {
                secret,
                exclude: options.exclude,
            },
        });
        logger.info("Mongo Auth is injected");
    },
});
