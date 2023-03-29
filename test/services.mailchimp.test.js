import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import onecontact from '../data/mock/onecontact.js';
import members from '../data/mock/members.js';
import list from '../data/list.js';
import {
    createList,
    deleteList,
    getListId,
    listMembers,
    postMember
} from "../services/mailchimp.js";
import {
    mockPostList,
    mockDeleteList,
    mockGetListId,
    mockGetListMembers,
    mockPostMember,
    MOCKED_LIST_ID
} from './helpers/services.mailchimp.helper.js';

chai.use(chaiAsPromised);

describe("MailchimpService", () => {

    describe("Functions", () => {

        it("createList() should be a valid async function", () => {

            assert.isDefined(createList);
            assert.isFunction(createList);

            assert.isTrue(createList.length == 1,
                "This function should accept one parameter.");

            assert.isTrue(
                createList.constructor
                    .name === 'AsyncFunction');
        });

        it("deleteList() should be a valid async function", () => {

            assert.isDefined(deleteList);
            assert.isFunction(deleteList);

            assert.isTrue(deleteList.length == 1,
                "This function should accept one parameter.");

            assert.isTrue(
                deleteList.constructor
                    .name === 'AsyncFunction');
        });

        it("getListId() should be a valid async function", () => {

            assert.isDefined(getListId);
            assert.isFunction(getListId);

            assert.isTrue(getListId.length == 0,
                "This function should accept no parameters.");

            assert.isTrue(
                getListId.constructor
                    .name === 'AsyncFunction');
        });

        it("listMembers() should be a valid async function", () => {

            assert.isDefined(listMembers);
            assert.isFunction(listMembers);


            assert.isTrue(listMembers.length == 1,
                "This function should accept one parameter.");

            assert.isTrue(
                listMembers.constructor
                    .name === 'AsyncFunction');
        });

        it("postMember() should be a valid async function", () => {

            assert.isDefined(postMember);
            assert.isFunction(postMember);

            assert.isTrue(postMember.length == 2,
                "This function should accept two parameters.");

            assert.isTrue(
                postMember.constructor
                    .name === 'AsyncFunction');
        });

    });

    describe("createList()", () => {

        let mockPost;

        before(() => {

            mockPost = mockPostList();
        });

        it("Should create a new List", async () => {

            let listId;

            const retrieveException = async () => {
                listId = await createList(list);
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(listId);

            assert.isTrue(listId
                === MOCKED_LIST_ID);
        });

        after(() => {

            mockPost.done();
        });
    });

    describe("deleteList()", () => {

        let mock;

        before(() => {

            mock = mockDeleteList();
        });

        it("Should delete the created List", async () => {

            const retrieveException = async () => {
                await deleteList(MOCKED_LIST_ID);
            }

            await assert.isFulfilled(
                retrieveException());
        });

        after(() => {

            mock.done();
        });
    });

    describe("getListId()", () => {

        let mock;

        before(() => {

            mock = mockGetListId();
        });

        it("Should get the main's list ID", async () => {

            let listId;

            const retrieveException = async () => {
                listId = await getListId();
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(listId);

            assert.isTrue(listId
                === MOCKED_LIST_ID);
        });

        after(() => {

            mock.done();
        });
    });

    describe("listMembers()", () => {

        let mockGet;

        before(() => {

            mockGet = mockGetListMembers();
        });

        it("Should get the main's list Members", async () => {

            let mmbrs;

            const retrieveException = async () => {

                mmbrs = await
                    listMembers(
                        MOCKED_LIST_ID);
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(mmbrs);
            assert.isArray(mmbrs);
            assert.isNotEmpty(mmbrs);

            const member = mmbrs[0];

            expect(member).to.have
                .property('email_address');

            assert.isTrue(members.members.at(0)
                .email_address === member.email_address);
        });

        after(() => {

            mockGet.done();
        });
    });

    describe("postMember()", () => {

        let mockPost;

        before(() => {

            mockPost = mockPostMember();
        });

        it("Should create a new Member", async () => {

            const contact = onecontact.at(0);

            const retrieveException = async () => {

                await postMember(MOCKED_LIST_ID, {
                    email_address: contact.email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: contact.firstName,
                        LNAME: contact.lastName
                    }
                });
            }

            await assert.isFulfilled(
                retrieveException());
        });

        after(() => {

            mockPost.done();
        });
    });

});

