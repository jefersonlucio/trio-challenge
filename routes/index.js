import express from 'express';
import contacts from './contacts.js';
import list from './list.js';

const routes = express.Router();

routes.use('/contacts', contacts);
routes.use('/list', list);

export default routes;
