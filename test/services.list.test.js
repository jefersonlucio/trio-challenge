import chai, { assert } from 'chai';
import env from '../loaders/envalid.js';
import chaiAsPromised from 'chai-as-promised';
import { resetList } from '../services/list.js';
import { FAKE_REQ_ID } from '../data/mock/request.js';
import log from '../services/log.js';
import {
    mockPostList,
    mockDeleteList,
    mockGetListId,
    mockGetEmptyListId,
    MOCKED_LIST_ID
} from './helpers/services.mailchimp.helper.js';

chai.use(chaiAsPromised);

describe("ListService", () => {

    describe("Functions", () => {

        it("resetList() should be a valid async function", () => {

            assert.isDefined(resetList);
            assert.isFunction(resetList);

            assert.isTrue(resetList.length == 2,
                "This function should two parameters.");

            assert.isTrue(
                resetList.constructor
                    .name === 'AsyncFunction');
        });

    });

    describe("resetList()", () => {

        let mockGet;
        let mockPost;

        before(() => {

            mockGet = mockGetEmptyListId();
            mockPost = mockPostList();
        });

        it("Should create the main List", async () => {

            let response;

            const retrieveException = async () => {

                response = await
                    resetList(log,
                        FAKE_REQ_ID);
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(
                response);
            assert.isObject(
                response);

            assert.isDefined(
                response.list);
            assert.isDefined(
                response.status);
            assert.isDefined(
                response.id);

            assert.isTrue(
                response.list
                === env.LIST_NAME);
            assert.isTrue(
                response.status
                === 'created');
            assert.isTrue(
                response.id
                === MOCKED_LIST_ID);
        });

        after(() => {

            mockGet.done();
            mockPost.done();
        });
    });

    describe("resetList()", () => {

        let mockGet;
        let mockDelete;
        let mockPost;

        before(() => {

            mockGet = mockGetListId();
            mockDelete = mockDeleteList();
            mockPost = mockPostList();
        });

        it("Should recreate the main List", async () => {

            let response;

            const retrieveException = async () => {

                response = await
                    resetList(log,
                        FAKE_REQ_ID);
            }

            await assert.isFulfilled(
                retrieveException());

            assert.isDefined(
                response);
            assert.isObject(
                response);

            assert.isDefined(
                response.list);
            assert.isDefined(
                response.status);
            assert.isDefined(
                response.id);

            assert.isTrue(
                response.list
                === env.LIST_NAME);
            assert.isTrue(
                response.status
                === 'recreated');
            assert.isTrue(
                response.id
                === MOCKED_LIST_ID);
        });

        after(() => {

            mockGet.done();
            mockDelete.done();
            mockPost.done();
        });
    });
});
