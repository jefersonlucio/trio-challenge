import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getContacts } from "../services/contacts.js";
import ApiError from "../errors/ApiError.js";
import onecontact from '../data/mock/onecontact.js';
import { mockGetContactsError, mockGetOneContact } from './helpers/services.contacts.helper.js';

chai.use(chaiAsPromised);

describe("ContactsService", () => {

    it("getContacts() should be a valid async function", () => {

        assert.isDefined(getContacts);
        assert.isFunction(getContacts);

        assert.isTrue(getContacts.length == 0,
            "This function should receive no parameters.");

        assert.isTrue(
            getContacts.constructor
                .name === 'AsyncFunction');
    });

    describe("getContacts()", () => {

        let mockContacts;

        before(() => {

            mockContacts =
                mockGetContactsError();
        });

        it("Should throw an ApiError exception", async () => {

            const retrieveException = async () => {
                await getContacts();
            }

            assert.isRejected(
                retrieveException(), ApiError);

            assert.isRejected(retrieveException(),
                "Request failed with status code 401");
        });

        after(() => {

            mockContacts.done();
        });
    });

    describe("getContacts()", () => {

        let mockContacts;

        before(() => {

            mockContacts =
                mockGetOneContact();
        });

        it("Should find one specific Contact", async () => {

            let contacts;

            const retrieveException = async () => {
                contacts = await getContacts();
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(contacts);
            assert.isArray(contacts);
            assert.isNotEmpty(contacts);

            const contact = contacts[0];

            assert.isObject(contact);

            assert.isDefined(contact.email);
            assert.isNotEmpty(contact.email);

            assert.isDefined(contact.firstName);
            assert.isNotEmpty(contact.lastName);

            assert.isDefined(contact.firstName);
            assert.isNotEmpty(contact.lastName);

            assert.isUndefined(contact.id);
            assert.isUndefined(contact.avatar);
            assert.isUndefined(contact.createdAt);

            assert.isTrue(contact.email
                === onecontact.at(0).email);
            assert.isTrue(contact.firstName
                === onecontact.at(0).firstName);
            assert.isTrue(contact.lastName
                === onecontact.at(0).lastName);
        });

        after(() => {

            mockContacts.done();
        });
    });

});