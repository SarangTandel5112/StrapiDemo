"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: 'mysql',
        connection: {
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: env.int('DATABASE_PORT', 3306),
            database: env('DATABASE_NAME', 'SA_Modules'),
            user: env('DATABASE_USERNAME', 'sarang'),
            password: env('DATABASE_PASSWORD', 'Sarang@1234'),
            ssl: env.bool('DATABASE_SSL', false),
        },
    },
});
