import { getContacts } from './contacts.js';
import { listMembers, getListId, createList, postMember } from './mailchimp.js';
import list from "../data/list.js";

const syncContacts = async (log, reqId) => {

    log.info(`id(${reqId}), ` +
        `syncContacts(): ['Starting...'].`);

    const subs =
        await getContacts();

    log.info(`id(${reqId}), ` +
        `syncContacts(): ['Found ` +
        `(${subs.length}) subs ` +
        `at source.'].`);

    let listId =
        await getListId();

    if (listId) {

        log.info(`id(${reqId}), ` +
            `syncContacts(): ['Found ` +
            `List id(${listId}).'].`);

    } else {

        listId = await
            createList(
                list);

        log.info(`id(${reqId}), ` +
            `syncContacts(): ['List ` +
            `id(${listId}) ` +
            `created.'].`);
    }

    const members =
        await listMembers(
            listId);

    log.info(`id(${reqId}), ` +
        `syncContacts(): ['List ` +
        `id(${listId}), contains ` +
        `(${members.length}) subs.'].`);

    const newSubs = subs
        .filter(sub => !members.some(mbr =>
            mbr.email_address === sub.email));

    for (const newSub of newSubs) {

        await postMember(listId, {
            email_address: newSub.email,
            status: 'subscribed',
            merge_fields: {
                FNAME: newSub.firstName,
                LNAME: newSub.lastName
            }
        });
    }

    if (newSubs.length > 0) {

        log.info(`id(${reqId}), ` +
            `syncContacts(): ['List ` +
            `id(${listId}), received ` +
            `(${newSubs.length}) new subs.'].`);

        return {
            syncedContacts: newSubs.length,
            contacts: newSubs
        }

    } else {

        log.info(`id(${reqId}), ` +
            `syncContacts(): ['List ` +
            `id(${listId}), no new ` +
            `subs were added. List was ` +
            `already up-to-date.'].`);

        return {
            message: `No new contacts found to be ` +
                `synced. Subscriber's list is up-to-date`
        }
    }
};

export { syncContacts }
