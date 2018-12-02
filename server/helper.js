// format result to be like {success:"bla", data:dataobj | error:errorobj}
module.exports = {

    /**
     * Format the response
     * @param boolean success 
     * @param mixed data 
     */
    createResult: function(success, data) {
        var result = {};

        result.success = success;
        data = (typeof data === 'object' && data !== null)? data : {message: data};

        if (!success) { 
            result.error = data;
        } else {
            result.data = data;
        }

        return result;
    }

}