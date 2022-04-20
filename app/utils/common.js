

exports.responseData = function (res, obj) {
    res.setHeader('S-HTTP_CODE', obj.statuscode || 500);
    res.send(obj);
}

exports.responseDataV2 = function (res, statuscode, obj, layer) {
    res.status(statuscode);
    if (layer == "proxy") {
        res.setHeader('S-PROXY-HTTP_CODE', statuscode);
    }
    if (layer == "target") {
        res.setHeader('S-TARGET-HTTP_CODE', statuscode);
    }

    res.setHeader('S-HTTP_CODE', statuscode);
    res.send(obj);
}
