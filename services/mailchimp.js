import axios, { AxiosError } from "axios";
import ApiError from "../errors/ApiError.js";
import env from '../loaders/envalid.js';

const getListId = async () => {

    try {

        const response = await axios.get(
            env.MAILCHIMP_SRV + env.MAILCHIMP_API_VER +
            env.MAILCHIMP_LIST_PATH + `?fields=lists.name,lists.id`,
            getConfig());

        return response.data?.lists?.find(
            list => list.name === env.LIST_NAME)?.id;

    } catch (err) {

        if (err
            instanceof
            AxiosError) {

            throw new
                ApiError(
                    err);

        } else {

            throw err;
        }
    }
};

const deleteList = async (id) => {

    try {

        await axios.delete(
            env.MAILCHIMP_SRV +
            env.MAILCHIMP_API_VER +
            env.MAILCHIMP_LIST_PATH +
            `/${id}`, getConfig());

    } catch (err) {

        if (err
            instanceof
            AxiosError) {

            throw new
                ApiError(
                    err);

        } else {

            throw err;
        }
    }
};

const createList = async (list) => {

    try {

        const response =
            await axios.post(
                env.MAILCHIMP_SRV +
                env.MAILCHIMP_API_VER +
                env.MAILCHIMP_LIST_PATH,
                list, getConfig());

        return response.data?.id;

    } catch (err) {

        if (err
            instanceof
            AxiosError) {

            throw new
                ApiError(
                    err);

        } else {

            throw err;
        }
    }
};

const listMembers = async (listId) => {

    try {

        const response = await axios.get(
            env.MAILCHIMP_SRV + env.MAILCHIMP_API_VER +
            env.MAILCHIMP_LIST_PATH + `/${listId}` +
            env.MAILCHIMP_MEMBERS_PATH +
            `?fields=members.email_address` +
            `&count=1000`, getConfig());

        return response?.data?.members;

    } catch (err) {

        if (err
            instanceof
            AxiosError) {

            throw new
                ApiError(
                    err);

        } else {

            throw err;
        }
    }
};

const postMember = async (listId, member) => {

    try {

        await axios.post(
            env.MAILCHIMP_SRV + env.MAILCHIMP_API_VER +
            env.MAILCHIMP_LIST_PATH + `/${listId}` +
            env.MAILCHIMP_MEMBERS_PATH, member, getConfig());

    } catch (err) {

        if (err
            instanceof
            AxiosError) {

            throw new
                ApiError(
                    err);

        } else {

            throw err;
        }
    }
};

const getConfig = () => {

    return {
        auth: {
            username: env.MAILCHIMP_USERNAME,
            password: env.MAILCHIMP_API_KEY
        }
    }
};

export { getListId, deleteList, createList, listMembers, postMember }
