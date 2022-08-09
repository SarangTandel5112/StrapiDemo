"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
module.exports = (plugin) => {
    const register = plugin.controllers.auth['register'];
    plugin.controllers.auth['register'] = async (ctx) => {
        // console.log("run form register")
        // const { email, password, username } = ctx.request.body;
        // const registerObject = {
        //   "client_id": `${process.env.AUTH0_CLIENT_ID}`,
        //   "email": `${email}`,
        //   "password": `${password}`,
        //   "connection": `${process.env.AUTH0_DATABASE_NAME}`,
        //   "username": `${username}`
        // }
        // try {
        //   const registered = await axios.post(`${process.env.AUTH0_URL}/dbconnections/signup`, registerObject);
        //   console.log(registered, "Registered");
        //   // console.log(registered)
        //   if (registered.data._id) {
        //     return register(ctx);
        //   }
        // } catch (error) {
        //   ctx.body = "User is already registered"
        // }
        const clientId = process.env.AUTH0_CLIENT_ID;
        const clientSecret = process.env.AUTH0_SECRET_KEY;
        const url = `${process.env.CLIENT_DOMAIN}/oauth/token`;
        // make the call to the API via POST
        let accesstoken;
        try {
            var options1 = {
                method: 'POST',
                url: `${process.env.AUTH0_URL}/oauth/token`,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: `mgav8SVAl49ZnwLkD8atI0FLGDMkZa8j`,
                    client_secret: `j2CABdilok-YGtEA63gnKC-LgAmyYnyuRNv4yl9FqIvXn-zf-kPMtyHrY9VxJsez`,
                    audience: `${process.env.AUTH0_URL}/api/v2/`
                    // scope: 'update:users'
                })
            };
            var data = await axios_1.default.request(options1);
            console.log(data.data);
            accesstoken = data.data.access_token;
            console.log(accesstoken, "+++++++++++++++");
        }
        catch (error) {
            console.log(error);
        }
        // console.log(data);
        // return true;
        var options = {
            method: 'PATCH',
            url: `${process.env.AUTH0_URL}/api/v2/users/auth0|62f288be8d707a3a503fdd71`,
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${accesstoken}`,
                'cache-control': 'no-cache'
            },
            audience: `${process.env.AUTH0_URL}/api/v2/`,
            scope: "update:users",
            data: { "connection": "Username-Password-Authentication", username: 'krishtandel' },
            // body: { username: 'saraatandel' },
        };
        try {
            const data1 = await axios_1.default.request(options);
            console.log(data1);
            return data1;
        }
        catch (error) {
            // console.log(error);
            console.log("errrrr");
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
