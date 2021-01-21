import 'reflect-metadata';
import 'express-async-errors';

import '@shared/container';

import express, { Express, Router } from 'express';

import Database from '@shared/infra/database';
import v1Router from '../api/v1';
import Handler from '../util/Handler';

interface IInitOpts {
  port: number;
  routes?: Router;
}

export default class App {
  protected server: Express;

  protected database: Database;

  public async init({ port, routes = v1Router }: IInitOpts): Promise<void> {
    this.server = express();

    this.server.use(express.json());

    this.server.use('/api/v1', routes);

    this.server.use(Handler);

    this.database = new Database();

    await this.database.start();

    this.server.listen(port);
  }
}
