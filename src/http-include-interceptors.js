Tny('http')

    .run(['$httpJsonInterceptor',function($httpJsonInterceptor){
        $httpJsonInterceptor();
    }])