const handlerNotFound = (req, res) => {
    res.status(404).json({
        error: "No existe ese recurso"
    });
};


exports.handlerNotFound = handlerNotFound;