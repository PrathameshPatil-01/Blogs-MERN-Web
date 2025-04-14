function createResult(error, data) {
    if (data) {
        return createSuccessResult(data)
    }
    else {
        return createErrorResult(error)
    }
}

function createSuccessResult(data) {
    console.log(data);
    
    return {
        status: 'success',
        data: data,
    };
}

function createErrorResult(error) {
    console.log(error);
    
    return {
        status: 'error',
        error: error,
    }
}

module.exports = { createErrorResult, createResult, createSuccessResult }