export default {
  // 支持值为 Object 和 Array
  'POST /api/userAuth': (req: any, res: any) => {
    const {
      headers
    } = req;
    const token = headers?.authorization || undefined;
    if(token){
      res.send({
        "result": true,
        "code": 200,
        "message": null,
        "data": true
      })
    }else{
      res.send({
        "result": true,
        "code": 405,
        "message": null,
        "data": true
      })
    }
  },

  'POST /api/login': {
    "result": true,
    "code": 200,
    "message": null,
    "data": {
      "expires_in": 3600,
      "token_type": "bearer",
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9saWxpdGhfYmlydGhkYXkudGRkbC5uZXRcL2FwaVwvd2V3b3JrXC90ZXN0TG9naW4iLCJpYXQiOjE2NDIwNjA1NTEsImV4cCI6MTY0MjA2NDE1MSwibmJmIjoxNjQyMDYwNTUxLCJqdGkiOiJxaTk0NjFuUHI4MUl6UVB3Iiwic3ViIjoxLCJwcnYiOiIwNzM2Nzk4MWFhYjY1MzBhMzM0Nzg4YzI5MjY5YWRiZjhjZjE1NmFiIn0.ftmb2Jpv-5mFJUXX1HOaGotiyTsYPT44SG-7Xg6cdrc"
    }
  },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },


  // 使用code换取token
  'POST /api/wework/codeLogin': {
    "code": 0,
    "message": null,
    "data": {
      "expires_in": 3600,
      "token_type": "bearer",
      "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9saWxpdGhfYmlydGhkYXkudGRkbC5uZXRcL2FwaVwvd2V3b3JrXC90ZXN0TG9naW4iLCJpYXQiOjE2NDIwNjA1NTEsImV4cCI6MTY0MjA2NDE1MSwibmJmIjoxNjQyMDYwNTUxLCJqdGkiOiJxaTk0NjFuUHI4MUl6UVB3Iiwic3ViIjoxLCJwcnYiOiIwNzM2Nzk4MWFhYjY1MzBhMzM0Nzg4YzI5MjY5YWRiZjhjZjE1NmFiIn0.ftmb2Jpv-5mFJUXX1HOaGotiyTsYPT44SG-7Xg6cdrc"
    }
  },
}
