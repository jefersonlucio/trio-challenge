import { createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { isUnderMocha } from '../utils.js';
import env from '../loaders/envalid.js';
import { DateTime } from 'luxon';

const transport = new DailyRotateFile({
    silent: isUnderMocha(),
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '14d'
});

const timed = format.printf(({
    level, message, timestamp
}) => {

    return `[${timestamp}] ${level}: ${message}`;
});

const timezoned = () => {

    return DateTime.now().setZone(
        env.TZ).toFormat('yyyy-LL-dd HH:mm:ss');
};

const log = createLogger({
    level: (env.LOG_LEVEL),
    format: format.combine(
        format.timestamp({
            format: timezoned
        }),
        timed
    ),
    transports: [
        transport
    ]
});

export default log;
