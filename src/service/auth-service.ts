import * as JWT from 'jsonwebtoken';
import * as tp from 'typed-promisify';
import ActiveDirectory from 'activedirectory2';
import {User} from './user';
import {injectable} from 'inversify';


@injectable()
export class AuthService  {


  public async login(user: User): Promise<string>
  {
    const env: any = process.env;

    try {
      const authUser = await this.authenticate(user);
      if (!authUser) {
        // console.log('no user');
        throw new Error('Invalid username/password');
      }
      const token = JWT.sign({
         user:  user.username
      }, env.UserSalt , {
        expiresIn: 86400,
      });

      return token;
    } catch (e) {
      console.log(e);
      throw new Error('Error while login');
    }
  }


  private async authenticate(user: User): Promise<boolean>
  {
    const env: any = process.env;
    const config: any = {
      url: env.ADurl,
      baseDN: env.ADbaseDn,
      username: env.ADusername,
      password: env.ADpassword,
    };

    const ad = new ActiveDirectory(config);
    const authenticate = tp.promisify(ad.authenticate);

    return authenticate(user.username, user.password);
  }

}