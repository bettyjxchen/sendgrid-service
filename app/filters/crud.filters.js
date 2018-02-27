module.exports = {
    disallowId
}

function disallowId(req, res, next) {
        if (req.model._id) {
            console.log("_id cannot be included in payload for post")
            res.status(400).json({
                name: "ValidationError",
                details: [
                    {
                        message: "_id cannot be included in body of payload"
                    }
                ]
            })
            return
        }
        next()
}
