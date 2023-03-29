import { getListId, deleteList, createList } from "./mailchimp.js";
import env from "../loaders/envalid.js";
import list from "../data/list.js";

const resetList = async (log, reqId) => {

    log.info(`id(${reqId}), ` +
        `resetList(): ['Starting...'].`);

    const retrn = {
        list: env
            .LIST_NAME
    };

    const listId =
        await getListId();

    if (listId) {

        log.info(`id(${reqId}), ` +
            `resetList(): ['List ` +
            `id(${listId}) exists, ` +
            `deleting it...'].`);

        await
            deleteList(
                listId);

        retrn.status =
            'recreated';

    } else {

        log.info(`id(${reqId}), ` +
            `resetList(): ['List ` +
            `does not exist yet.'].`);

        retrn.status =
            'created';
    }

    retrn.id = await
        createList(list);

    log.info(`id(${reqId}), ` +
        `resetList(): ['List ` +
        `id(${retrn.id}) ` +
        `${retrn.status}.'].`);

    return retrn;
};

export { resetList }
