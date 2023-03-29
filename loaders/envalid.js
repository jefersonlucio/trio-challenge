import * as dotenv from 'dotenv';
dotenv.config();
import { makeValidator, cleanEnv, port, url, email, str } from 'envalid';

const notEmptyStr = makeValidator(value => {

    if (value.trim().length == 0) {

        throw Error(
            'May not be an ' +
            'empty string.');

    } else {

        return value;
    }
});

const env = cleanEnv(process.env, {

    LOG_LEVEL: str({
        choices: ['error', 'warn', 'info',
            'http', 'verbose', 'debug', 'silly']
    }),

    TZ: notEmptyStr({
        desc: 'Prefered timezone for logging',
        example: 'America/Sao_Paulo, Europe/London or UTC'
    }),

    MAILCHIMP_API_KEY: notEmptyStr({
        desc: 'Mailchimp\'s API key'
    }),

    MAILCHIMP_SRV: url({
        desc: 'Mailchimp\'s server name'
    }),

    MAILCHIMP_USERNAME: notEmptyStr({
        desc: 'Mailchimp\'s user name'
    }),

    MAILCHIMP_API_VER: notEmptyStr({
        desc: 'Mailchimp\'s API version',
        example: '/3.0'
    }),

    MAILCHIMP_LIST_PATH: notEmptyStr({
        desc: 'Mailchimp\'s URL endpoint for GET, POST and DELETE verbs on lists',
        example: '/lists'
    }),

    MAILCHIMP_MEMBERS_PATH: notEmptyStr({
        desc: 'Mailchimp\'s URL endpoint for GET, POST and DELETE verbs on list members',
        example: '/members'
    }),

    PORT: port({
        desc: 'Port in witch to start the Express Application Server',
        example: 8000
    }),

    CONTACTS_SERVER: url({
        desc: 'Server where GET endpoint containing contacts\' information is available',
        example: 'https://challenge.trio.dev'
    }),

    CONTACTS_ENDPOINT: notEmptyStr({
        desc: 'GET endpoint containing contacts\' information',
        example: '/api/v1/contacts'
    }),

    LIST_NAME: notEmptyStr({
        desc: 'Something subscriber will instantly recognize, like your name or your company\'s name',
        example: 'America/Sao_Paulo'
    }),

    LIST_FROM: email({
        desc: 'Your personal or business mail address. An address subscribers can reply to'
    })
});

export default env;
