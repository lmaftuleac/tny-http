lightNg('http')

    .provider('$$httpErrorHandler', function() {
        function errorHandler(xhr) {
            console.log(xhr.status);
        }

        return {
            set : function(fn) {
                errorHandler = fn || lightNg.noop;
            },
            get : function() {
                return errorHandler;
            }
        }
    })

;