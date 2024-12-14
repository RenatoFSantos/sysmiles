import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
// import { AppDataSource } from "./configuration/connection";
import { Routes } from './routes';
import 'dotenv/config';
import auth from './middlaware/auth';
import { CorsOptions } from 'cors';
const cors = require('cors');

const allowOrigins = ['http://localhost:3000', 'http://localhost:3333']
const options: CorsOptions = {
    origin: allowOrigins
}

// create express app

const app = express();
app.use(cors(options));
app.use(bodyParser.json());

app.use(auth);

// register express routes from defined application routes
Routes.forEach((route) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
            // result.then((result) =>
            //   result !== null && result !== undefined ? res.send(result) : undefined
            // );
            result.then((d) => {
                if (d && d.status) res.status(d.status).send(d.message || d.errors);
                else res.json(d);
            });
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

// start express server
app.listen(process.env.PORT, async () => {
    console.log(`Api initialized in port ${process.env.PORT}`);
    try {
        await AppDataSource.initialize()
            .then(() => {
                console.log('Database conected! 🏆');
            })
            .catch((err) => {
                console.error('Erro durante o processo de inicialização', err);
            });
    } catch (error) {
        console.log('Database não conectado! Erro =', error);
    }
});
