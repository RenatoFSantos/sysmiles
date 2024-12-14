// route -> controller -> repository
// route -> middlaware -> controller -> repository
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

export default async (req: Request, res: Response, next: Function) => {
    let token = req.body.token || req.query.token || req.headers['x-token-access'];
    let publicRoutes = <Array<String>>process.env.PUBLICROUTES.split(',');
    let isPublicRoute: boolean = false;

    publicRoutes.forEach((url) => {
        if (req.url.includes(url) || url.includes('users/email/:')) {
            isPublicRoute = true;
        }
    });

    if (isPublicRoute) {
        next();
    } else {
        if (token) {
            if(token.indexOf("Bearer") != -1) {
                token = token.slice(7);
            }
            try {
                let _userAuth = verify(token, process.env.SECRETKEY);
                req.params.userAuth = _userAuth;
                next();
            } catch (error) {
                res.status(401).send({ message: 'Token informado é inválido!' });
            }
            process.env.SECRETKEY;
        } else {
            res.status(401).send({ message: 'Para acessar este recurso você precisa estar autenticado!' });
            return;
        }
    }
};
