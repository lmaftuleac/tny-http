lightNg('http')

    .run(['$httpJsonInterceptor',function($httpJsonInterceptor){
        $httpJsonInterceptor();
    }])