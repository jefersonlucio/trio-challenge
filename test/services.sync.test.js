import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { syncContacts } from '../services/sync.js';
import { mockGetMultipleContacts } from './helpers/services.contacts.helper.js';
import { mockGetEmptyListMembers, mockGetListId, mockPostMember } from './helpers/services.mailchimp.helper.js';
import { FAKE_REQ_ID } from '../data/mock/request.js';
import log from '../services/log.js';

chai.use(chaiAsPromised);

describe("SyncService", () => {

    describe("Functions", () => {

        it("syncContacts() should be a valid async function", () => {

            assert.isDefined(syncContacts);
            assert.isFunction(syncContacts);

            assert.isTrue(syncContacts.length == 2,
                "This function should accept two parameters.");

            assert.isTrue(
                syncContacts.constructor
                    .name === 'AsyncFunction');
        });
    });

    describe("syncContacts()", () => {

        let mockContacts;
        let mockList;
        let mockMembers;

        before(() => {

            mockContacts = mockGetMultipleContacts();
            mockList = mockGetListId();
            mockMembers = mockGetEmptyListMembers();

            mockPostMember();
        });

        it("Should sync contacts between the Mock API and Mailchimp", async () => {

            let response;

            const retrieveException = async () => {

                response = await
                    syncContacts(log,
                        FAKE_REQ_ID);
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(
                response);
            assert.isObject(
                response);

            assert.isDefined(
                response.syncedContacts);
            assert.isNumber(
                response.syncedContacts);
            assert.isTrue(
                response.syncedContacts === 4);

            assert.isDefined(
                response.contacts);
            assert.isArray(
                response.contacts);
            assert.isNotEmpty(
                response.contacts);
            assert.isTrue(
                response.contacts.length === 4);
        });

        after(() => {

            mockContacts.done();
            mockList.done();
            mockMembers.done();
        });
    });

});