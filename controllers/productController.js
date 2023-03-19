exports.getByKeyWord = (req, res, next) => {
    var queryParameter = req.query;
    console.log(queryParameter);
    res.json(queryParameter);
};