import 'express-async-errors';
import express from 'express';
import env from './envalid.js';
import { createHttpTerminator } from 'http-terminator';

const app = express();

const server = app
    .listen(env.PORT);

let httpTerminator;

if (server) {

    server.on('error', err => {

        console.log('\n');

        console.error(
            err.message);

        console.error('\n' +
            'Error on Express Server ' +
            'Instance. Check the log ' +
            'files for details.\n' +
            'Exiting with ' +
            'ERR_CODE=1...\n');

        if (httpTerminator) {

            httpTerminator
                .terminate().then(
                    () => process.exit(1));

        } else {

            process.exit(1);
        }
    });

    server.on('listening', () => {

        console.log(`\nExpress server ` +
            `started. Listening on port ` +
            `[${server.address().port}].\n`);

        httpTerminator =
            createHttpTerminator({
                server,
                gracefulTerminationTimeout: 10000
            });
    });

    process.on('SIGTERM', () => {

        console.log(
            `\nSignal SIGTERM received. ` +
            `Terminating Server and exiting...\n`);

        httpTerminator
            .terminate().then(
                () => process.exit(0));
    });

    process.on('SIGINT', () => {

        console.log(
            `\nSignal SIGINT received. ` +
            `Terminating Server and exiting...\n`);

        httpTerminator
            .terminate().then(
                () => process.exit(0));
    });

    process.on('uncaughtException', error => {

        console.log('\n');

        console.error(
            error.message);

        console.error(
            `\nUncaught exception was ` +
            `thrown inside process. ` +
            `Terminating Server and exiting ` +
            `with ERR_CODE=1...\n`);

        if (httpTerminator) {

            httpTerminator
                .terminate().then(
                    () => process.exit(1));

        } else {

            process.exit(1);
        }
    });

} else {

    console.error('\nExpress: ' +
        'Server object ' +
        'not defined.\n');

    console.error(
        '\nExiting with ' +
        'ERR_CODE=1...\n');

    process.exit(1);
}

export default app;
