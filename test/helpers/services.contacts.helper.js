import nock from 'nock';
import env from '../../loaders/envalid.js';
import onecontact from "../../data/mock/onecontact.js";
import multiplecontacts from '../../data/mock/multiplecontacts.js';

const mockServer = () => {

    return nock(
        env.CONTACTS_SERVER);
};

const mockGetContactsError = () => {

    return mockServer()
        .get(env.CONTACTS_ENDPOINT)
        .reply(401, 'Security Error!');
};

const mockGetOneContact = () => {

    return mockServer()
        .get(env.CONTACTS_ENDPOINT)
        .reply(200, onecontact);
};

const mockGetMultipleContacts = () => {

    return mockServer()
        .get(env.CONTACTS_ENDPOINT)
        .reply(200, multiplecontacts);
};

export { mockGetContactsError, mockGetOneContact, mockGetMultipleContacts }
