let helper = {};

/**
 * @desc Response object function
 * @param {string} httpStatus - The message of the respones.
 * @param {string} response - The data of the response.
 * @returns {object} response object
 */
helper.responseObject = function (httpStatus, code, resMsg, resData) {
    return {
        statusCode: httpStatus,
        headers: {
            "Content-Type": "application/json",
            // Required for CORS support to work
            "Access-Control-Allow-Origin": "*",
            // Required for cookies
            "Access-Control-Allow-Credentials": true,
            // Authorization headers
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        },
        body: JSON.stringify({
            responseCode: code,
            responseMessage: resMsg,
            responseData: resData
        })
    };
};

// Validate Input Key
helper.decimalNumber = function (x) {
    return Number.parseFloat(x).toFixed(2);
};

/**
 * @desc Check given key value is empty, null, undefined
 * @param {string} data - The data of the response.
 * @returns {boolean} true/false
 */
helper.isKeyDefined = function (paramKey) {
    return paramKey !== undefined && paramKey !== '' && paramKey !== null;
};

/**
 * @desc Current UTC time stamp
 * @returns {number} 
 */
helper.currentUTC = function () {
    let dateObj = new Date();
    return Date.parse(dateObj.toUTCString());
};

/**
 * @desc Return new object ID
 * @returns {string} 
 */
helper.objectID = function () {
    return new global.mongoose.Types.ObjectId;
};


module.exports = helper;
