import express from 'express';
import { resetList } from '../services/list.js';
import log from '../services/log.js';

const list = express.Router();

list.post('/reset', async (req, res) => {

    res.status(200).json(
        await resetList(
            log, req.id));
});

export default list;
