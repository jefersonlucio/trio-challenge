export default class ApiError extends Error {

    #axiosError;
    status;

    constructor(axiosError) {

        super(axiosError.message);

        this.axiosError = axiosError;
        this.status = this.axiosError?.response?.status;
    }

    toJSON() {
        return {
            message: this.message,
            detail: this.axiosError?.response?.data?.detail,
            url: this.axiosError?.config?.url,
            method: this.axiosError?.config?.method,
            code: this.axiosError?.code,
            status: this.status
        };
    }
}
