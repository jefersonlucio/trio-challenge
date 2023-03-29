import app from './loaders/express.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';
import requestIp from 'request-ip';

app.use(requestIp.mw());

app.use(logger);
app.use(routes);
app.use(errorHandler);

