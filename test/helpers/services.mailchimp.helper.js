import nock from 'nock';
import env from '../../loaders/envalid.js';
import members from '../../data/mock/members.js';
import { assert } from 'chai';

const MOCKED_LIST_ID = '7b82c01736';

const getAuthorization = () => {

    return 'Basic '.concat(Buffer.from(
        env.MAILCHIMP_USERNAME.concat(':').concat(
            env.MAILCHIMP_API_KEY)).toString('base64'));
};

const mockServer = () => {

    return nock(env.MAILCHIMP_SRV, {
        reqheaders: {
            authorization:
                getAuthorization()
        }
    });
};

const mockPostList = () => {

    return mockServer()
        .post(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
        ).reply(201, {
            id: MOCKED_LIST_ID
        });
};

const mockDeleteList = () => {

    return mockServer()
        .delete(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
            .concat(`/${MOCKED_LIST_ID}`)
        ).reply(204);
};

const mockGetListId = () => {

    return mockServer()
        .get(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
        ).query({
            fields: "lists.name,lists.id"
        }).reply(200, {
            lists: [{
                id: MOCKED_LIST_ID,
                name: env.LIST_NAME
            }]
        });
};

const mockGetEmptyListId = () => {

    return mockServer()
        .get(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
        ).query({
            fields: "lists.name,lists.id"
        }).reply(200, {
            lists: []
        });
};

const mockGetListMembers = () => {

    return mockServer()
        .get(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
            .concat(`/${MOCKED_LIST_ID}`)
            .concat(env.MAILCHIMP_MEMBERS_PATH)
        ).query({
            fields: "members.email_address",
            count: 1000
        }).reply(200, members);
};

const mockGetEmptyListMembers = () => {

    return mockServer()
        .get(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
            .concat(`/${MOCKED_LIST_ID}`)
            .concat(env.MAILCHIMP_MEMBERS_PATH)
        ).query({
            fields: "members.email_address",
            count: 1000
        }).reply(200, {
            members: []
        });
};

const mockPostMember = () => {

    return mockServer().persist()
        .post(env.MAILCHIMP_API_VER
            .concat(env.MAILCHIMP_LIST_PATH)
            .concat(`/${MOCKED_LIST_ID}`)
            .concat(env.MAILCHIMP_MEMBERS_PATH)
        ).reply(201, (uri, body) => {

            assert.isDefined(body,
                "The request body " +
                "is not defined.");

            assert.isObject(body,
                "The request's body does " +
                "not contain a valid object.");

            assert.isDefined(
                body.email_address);
            assert.isString(
                body.email_address);
            assert.isNotEmpty(
                body.email_address);

            assert.isDefined(
                body.status);
            assert.isTrue(
                body.status ===
                'subscribed');

            assert.isDefined(
                body.merge_fields);
            assert.isObject(
                body.merge_fields);

            assert.isDefined(
                body.merge_fields.FNAME);
            assert.isString(
                body.merge_fields.FNAME);
            assert.isNotEmpty(
                body.merge_fields.FNAME);

            assert.isDefined(
                body.merge_fields.LNAME);
            assert.isString(
                body.merge_fields.LNAME);
            assert.isNotEmpty(
                body.merge_fields.LNAME);
        });
};

export { MOCKED_LIST_ID, mockPostList, mockDeleteList, mockGetListId, mockGetListMembers, mockPostMember, mockGetEmptyListId, mockGetEmptyListMembers }
