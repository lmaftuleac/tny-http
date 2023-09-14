# Tny-http
http service for [Tny](https://github.com/lmaftuleac/tny) framework

## How to use

```
Tny('app')
    
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