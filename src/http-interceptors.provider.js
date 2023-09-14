
Tny('http')

    .provider('$$httpInterceptors', function(){

        var interceptors = {
            // 'interceptorName' : {
            //     pre : function(options, xhr){
            //     },
            //     post : function(response, options, xhr) {
            //          return formattedData;
            //     }
            // }
        }

        function validateInterceptor(interceptorObj){
            if (!interceptorObj.pre && !interceptorObj.post ) {
                throw 'HTTP interceptors must have at least one "pre" or "post" function';
            }
        }

        return {
            getInterceptors : function(){
                return interceptors;
            },
            addInterceptor : function(name, interceptorObj) {
                validateInterceptor(interceptorObj);
                interceptors[name] = interceptorObj;
            },
            removeInterceptor : function(name) {
                delete interceptors[name];
            }
        }

    })

;