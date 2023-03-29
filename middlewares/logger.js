import crypto from 'crypto';
import log from '../services/log.js';

const logger = (req, res, next) => {

    req.id = crypto
        .randomBytes(8)
        .toString('hex');

    log.info(`id(${req.id}), ` +
        `request started. ` +
        `size: ${req.get('content-length') || 0} bytes. ` +
        `${req.protocol.toUpperCase()}/` +
        `${req.httpVersion}, ` +
        `${req.method}, ` +
        `${req.originalUrl}, ` +
        `${res.statusCode}, ` +
        `[${req.clientIp}], ` +
        `[${req.get('user-agent')}].`);

    const start =
        Date.now();

    res.on('finish', () => {

        const duration =
            Date.now() - start;

        log.info(`id(${req.id}), ` +
            `response finished. ` +
            `httpStatus: ${res.statusCode}, ` +
            `size: ${res.get('content-length') || 0} ` +
            `bytes, duration: ${duration} ms.`);
    });

    next();
};

export default logger;
