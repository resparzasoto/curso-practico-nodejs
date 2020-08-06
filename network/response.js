const success = (req, res, message = 'Done', status = 200) => {
    res.status(status).send({
        error: false,
        status: status,
        body: message,
    });
}

const error = (req, res, message = 'Internal Server Error', status = 500, details = 'No more details') => {
    console.log(details);

    res.status(status).send({
        error: true,
        status: status,
        body: message,
    });
}

module.exports = {
    success,
    error,
};