import axios, { AxiosError } from 'axios';
import env from '../loaders/envalid.js'
import ApiError from '../errors/ApiError.js';

const getContacts = async () => {

    try {

        const response =
            await axios({
                method: 'get',
                url: env.CONTACTS_SERVER.concat(env.CONTACTS_ENDPOINT)
            });

        return response.data?.map(
            ({ firstName, lastName, email }) =>
                ({ firstName, lastName, email }));

    } catch (error) {

        if (error
            instanceof AxiosError) {

            throw new
                ApiError(error);

        } else {

            throw error;
        }
    }
};

export { getContacts };
