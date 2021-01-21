import { createConnections, Connection } from 'typeorm';

export default class Database {
  private connections: Connection[];

  public async start(): Promise<Connection[]> {
    this.connections = await createConnections();

    return this.connections;
  }

  public async stop(): Promise<void> {
    await Promise.all(this.connections.map((conn) => conn.close()));
  }

  public getConn(): Connection[] {
    return this.connections;
  }
}
