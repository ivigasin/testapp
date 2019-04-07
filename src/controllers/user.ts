import * as express from 'express';

import { interfaces, httpPost, request, response, controller } from 'inversify-express-utils';
import { injectable, inject} from 'inversify';


import { AuthService } from '../service/auth-service';


@controller('/user')
export class UserController implements interfaces.Controller
{
  constructor( @inject('AuthService') private authService: AuthService) { }

  @httpPost('/login')
  private async login(@request() req: express.Request, @response() res: express.Response)
  {
      try {
        const token =  await this.authService.login(req.body);
        res.json({
          auth: token
        }).status(201);
      } catch (e) {
        res.status(401);
      }
  }


}