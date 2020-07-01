import 'reflect-metadata';
import { Application } from './kernel';
import Router from './kernel/router';
import * as KoaBodyparser from 'koa-bodyparser';
import Config from './kernel/config';
import middleware from './kernel/middleware';
import { createConnection } from "typeorm";
import * as path from 'path';
import { VUser } from './entities/VUser';
import { init } from './kernel/core';

const app: Application = new Application();

// createConnection({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "",
//   database: "v_admin",
//   entities: [
//     path.resolve(__dirname, `entities/*.ts`)
//   ],
//   logging: true
// }).then(connection => {
//   // const User = new VUser();
//   // // const a = connection.
//   // console.log(2222, User);
//   // User.name = '哈哈';
//   // User.email = '873468428@qq.com';
//   connection.manager.find(VUser).then(res => {
//     console.log(33333, res)
//   }).catch(err => {
//     console.log(44444, err)
//   })
//   // here you can start to work with your entities
// }).catch(error => console.log(error));


Config(app);
app.use(KoaBodyparser());
app.use(middleware);
Router(app);
init(app);

const prot = app.config.port;

app.listen(prot);
console.log(`this app is at http://localhost:${prot}`);
