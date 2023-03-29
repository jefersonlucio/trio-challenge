import ApiError from "../errors/ApiError.js";
import log from "../services/log.js";

const errorHandler = (error, req, res, next) => {

    if (error instanceof ApiError) {

        log.error(`id(${req.id}), ` +
            `error: ${JSON.stringify(error)}.`);

        if (error.status) {

            res.status(error
                .status).json(error);

        } else {

            res.status(500)
                .json(error);
        }

    } else {

        log.error(`id(${req.id}), ` +
            `Internal Server Error, ` +
            `[${error.constructor.name}], ` +
            `message: {${error.message}}.`);

        res.status(500).json({
            message: "Internal Server Error.",
            error: error.constructor.name,
            errorMessage: error.message
        });
    }

    next();
}

export default errorHandler;
