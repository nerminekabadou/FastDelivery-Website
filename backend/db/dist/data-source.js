"use strict";
exports.__esModule = true;
exports.dataSourceOptions = void 0;
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    logging: true,
    synchronize: false
};
var dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
dataSource.initialize();
exports["default"] = dataSource;
