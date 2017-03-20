
lightNg('http')

    .provider('$$httpHeaders',function(){
        var headers = {
            // 'Content-type': 'application/json;charset=utf-8'
        };
        return {
            setHeader : function(header,value) {
                headers[header] = value;
            }, 
            getHeaders : function(){
                return headers
            }
        }
    })

;