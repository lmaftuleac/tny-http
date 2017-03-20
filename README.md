# light-ng-http
http service for light-ng framework

## How to use

```
lightNg('app')
    
    .include('http')

    .run(['$http',function($http) {

        $http.send({
            url : 'https://reqres.in/api/users',
            method : "POST",
            data : {
                "name": "morpheus",
                "job": "leader"
            },
            async : true,
            callback : function(data){
                console.log(data);
            },
            error : function(err) {
                console.log(err);
            }
        });

    }])
    
    .build();

```

## 