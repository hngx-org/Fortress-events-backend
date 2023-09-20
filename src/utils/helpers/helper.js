// Handle async is wrapper for your request handler,
// it removes the need to use a try catch block and centralises error handling
function handleAsync(callback) {
    // Return request handler function
    return async (req, res, next) => {
      try {
        // Fire callback function
        await callback(req, res, next);
      } catch (error) {
        // Respond with statusCode if defined else 500
        res.status(error.statusCode || 500).json(handleError(error.message));
      }
    };
  }
  
  // Creates a standard error response object
  // sample usage:
  // res.status(404).json(handleError("user Not Found"))
  function handleError(message = "Internal Server Error") {
    // Return standardised error response
    return { message, success: false };
  }
  
  // creates a custom api error with the given status code and message
  // sample usage:
  // throw createApiError("user Not Found", 404)
  function createApiError(message = "Internal Server Error", statusCode = 500) {
    // Create new instance of error
    const error = new Error(message);
  
    // Append statusCode property to error object to facilitate error handling
    error.statusCode = statusCode;
  
    return error;
  }
  
  // Returns a standard response for api requests
  // sample usage res.status(200).json(handleResponse({ users },"sucessfully created "))
  function handleResponse(data = {}, message = "success") {
    // Returns standardised success response format
    return {
      message,
      data,
      success: true
    };
  }
  
  module.exports = {
    handleAsync,
    handleError,
    handleResponse,
    createApiError
  };