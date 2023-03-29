import express from 'express';
import { syncContacts } from '../services/sync.js';
import log from '../services/log.js';

const contacts = express.Router();

contacts.post('/sync', async (req, res) => {

    res.status(200).json(
        await syncContacts(
            log, req.id));
});

export default contacts;
