import 'reflect-metadata';
// import Application, * as Koa from "koa";
import { Application } from './kernel/index';
import Router  from './kernel/router';
import * as KoaBodyparser from 'koa-bodyparser';
import Config from './kernel/config';
import middleware from './kernel/middleware';

const app: Application = new Application();
Config(app);
app.use(KoaBodyparser());
app.use(middleware);
Router(app);

app.listen(3000);
console.log(`this app is at http://localhost:3000`);
