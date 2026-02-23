export const errorHandler = (errors, req, res, next) => {
    if (errors) {
        return res.status(400).json({
            errors: errors.map(error => error.msg)
        });
    }
    next();
};