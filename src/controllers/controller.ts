import * as rest from 'restify';
export interface Controller {
    path: string;
    router: rest.Router;
    initRoute(): void;
}