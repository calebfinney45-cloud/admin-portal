import jsonServer from 'json-server';
import path from 'path';

const server = jsonServer.create();
// Use process.cwd() to ensure the router finds the file in the project root
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewrites({
  '/api/*': '/$1'
}));
server.use(router);

export default server;