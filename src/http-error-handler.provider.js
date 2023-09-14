Tny('http')

    .provider('$$httpErrorHandler', function() {
        function errorHandler(xhr) {
            console.log(xhr.status);
        }

        return {
            set : function(fn) {
                errorHandler = fn || Tny.noop;
            },
            get : function() {
                return errorHandler;
            }
        }
    })

;