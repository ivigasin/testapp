import * as dotenv from 'dotenv';
dotenv.config();

import * as bodyParser from 'body-parser';
import 'reflect-metadata';


import { Container } from 'inversify';
import {  InversifyExpressServer } from 'inversify-express-utils';
import { AuthService } from './src/service/auth-service';


import "./src/controllers/user";



let container = new Container();

container.bind<AuthService>('AuthService').to(AuthService);

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
   app.use(bodyParser.urlencoded({ extended: true }) );
  app.use(bodyParser.json());
});

let app = server.build();

app.listen(process.env.port);