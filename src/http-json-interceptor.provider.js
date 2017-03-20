
lightNg('http')

    .factory('$httpJsonInterceptor', ['$$httpInterceptors',function($$httpInterceptors) {

        function pre(options, xhr) {
            if (options.dataType.toUpperCase() === 'JSON' && options.method !== 'GET') {
                xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                options.data = JSON.stringify(options.data);
            }
        }

        function post(response, options, xhr) {
            var output;
            if (options.dataType.toUpperCase() === 'JSON') {
                try {
                    output = JSON.parse(response);
                } catch(e){
                    //erorr
                }
            }
            return output || response;
        }

        return function(){
            $$httpInterceptors.addInterceptor('jsonDataTypeFormatter',{
                pre : pre,
                post : post
            })
        }
       
    }])

;