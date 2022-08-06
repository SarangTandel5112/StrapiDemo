"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = (plugin) => {
    const register = plugin.controllers.auth['register'];
    plugin.controllers.auth['register'] = async (ctx) => {
        console.log("run form register");
        const { email, password, username } = ctx.request.body;
        const registerObject = {
            "client_id": `${process.env.AUTH0_CLIENT_ID}`,
            "email": `${email}`,
            "password": `${password}`,
            "connection": `${process.env.AUTH0_DATABASE_NAME}`,
            "username": `${username}`
        };
        try {
            const registered = await axios_1.default.post(`${process.env.AUTH0_URL}/dbconnections/signup`, registerObject);
            console.log(registered, "Registered");
            // console.log(registered)
            if (registered.data._id) {
                return register(ctx);
            }
        }
        catch (error) {
            ctx.body = "User is already registered";
        }
    };
    plugin.controllers.auth['login'] = async (ctx) => {
        console.log("hello world");
        const { email, password, username } = ctx.request.body;
        const loginObject = {
            "client_id": `${process.env.AUTH0_CLIENT_ID}`,
            "email": `${email}`,
            "password": `${password}`,
            "connection": `${process.env.AUTH0_DATABASE_NAME}`,
            "username": `${email}`,
            'grant-type': `password`,
            "scope": null
        };
        try {
            const loggedIn = await axios_1.default.post(`${process.env.AUTH0_URL}/oauth/ro`, loginObject);
            console.log(loggedIn);
            // console.log(registered)
            // if(loggedIn.data._id){
            //   return register(ctx);
            // }
        }
        catch (error) {
            console.log(error);
        }
    };
    const routes = plugin.routes['content-api']['routes'];
    routes.push({
        method: 'POST',
        path: '/auth/login',
        handler: 'auth.login',
        config: { prefix: '' }
    });
    return plugin;
};
