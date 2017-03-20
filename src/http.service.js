
lightNg('http')


    .service('$http', ['$$httpHeaders', '$$httpInterceptors', '$$httpErrorHandler', function($$httpHeaders, $$httpInterceptors, $$httpErrorHandler) {

        function getXhrType() {
            if (typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest();
            }
            var versions = [
                "MSXML2.XmlHttp.6.0",
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];

            var xhr;
            for (var i = 0; i < versions.length; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                } catch (e) {
                }
            }
            return xhr;
        };

        function transformDataToQuery (url, data) {
            if (!data) return url;
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            return url + (query.length ? '?' + query.join('&') : '');
        };

        function setHeaders(xhr, headers) {
            if (headers) {
                for(key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key]);
                    } 
                }
            }
        };

        function applyPreInterceptors(options, xhr){
            var interceptors = $$httpInterceptors.getInterceptors();
            for (var key in interceptors) {
                interceptors[key].pre(options, xhr);
            }
        };

        function applyPostInterceptors(options, xhr){
            var interceptors = $$httpInterceptors.getInterceptors();
            var data = xhr.responseText;
            for (var key in interceptors) {
                data = interceptors[key].post(data, options, xhr) || data;
            }
            options.callback(data, xhr);
        };

        function handleResponse(options, xhr) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 ) {
                    if (xhr.status >=200 && xhr.status<207) {
                        applyPostInterceptors(options,xhr);
                    } else {
                        var out = options.error(xhr);
                        if (out !== false) {
                            $$httpErrorHandler.get()(xhr);
                        }
                    }
                }
            }
        };


        this.send = function(userOpts) {
            var options = {};
            var defaults = {
                callback : lightNg.noop,
                error : lightNg.noop,
                method : 'GET',
                data : "",
                async : true,
                dataType : 'JSON',
                headers : {}
            }
            
            //extend with defaults
            options.callback    = userOpts.callback   || defaults.callback;
            options.error       = userOpts.error      || defaults.error;
            options.method      = userOpts.method     || defaults.method;
            options.data        = userOpts.data       || defaults.data;
            options.async       = userOpts.async      || defaults.async;
            options.dataType    = userOpts.dataType   || defaults.dataType;
            options.headers     = userOpts.headers    || defaults.headers;
            options.url         = userOpts.url;

            if (!options.url) {
                throw "HTTP requires URL";
            }

            if (options.method == 'GET') {
                options.url = transformDataToQuery(options.url, options.data);
            }

            var xhr = getXhrType();

            xhr.open(options.method, options.url, options.async);

            applyPreInterceptors(options, xhr);
            setHeaders($$httpHeaders.getHeaders());
            setHeaders(options.headers);

            handleResponse(options, xhr);

            xhr.send(options.data);

        };

    }]);