import StartUp from "./startUp";
import { normalizePort, onError, onListening } from './utils/utils';

let port = normalizePort(process.env.port || 3050);
const host = process.env.host || '127.0.0.1';

StartUp.app.listen(port, function() {
}).on('error', onError(port)).on(
  'listening', onListening(host, port)
);
