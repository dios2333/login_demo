/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { RequestConfig  } from 'umi';
import { Toast } from 'antd-mobile';

const codeMessage:any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  405: '用户未登录，跳转登录页',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * response 异常处理程序
 */
const errorHandler = (error:any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if(status === 401){
      window.location.replace('/login');
    }
    Toast.show({
      content: `请求错误 ${status}: ${url}, ${errorText}`,
    });

  } else if (!response) {
    Toast.show({
      content: `您的网络发生异常，无法连接服务器`,
    });
  }

  return response;
};

// request拦截器, 改变url 或 options.
const reqInterceptor:any = async (url:any, options:any) => {
  const c_token = localStorage.getItem("login_demo_tk");
  // console.log('token', c_token);
  if (c_token) {
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': c_token,
    };
    if('headers' in options){
      headers = {
        ...headers,
        ...options.headers,
      }
    }
    return (
      {
        url: url,
        options: { ...options, headers, },
      }
    );
  } else {
    return (
      {
        url: url,
        options: { ...options },
      }
    );
  }
};

// response拦截器, 处理response
const resInterceptor: any = (response:any, options:any) => {
  const token = response.headers.get("Authorization");
  if (token) {
    localStorage.setItem("login_demo_tk", token);
  }
  return response;
};

// 请求前后处理
const midWare: any = async (ctx: any, next: any) => {
  const { req } = ctx;

  await next();
  const { res } = ctx;
  const { code } = res;
  if (code && code !== 200) {
    // 对异常情况做对应处理
    const errorText = res.message || codeMessage[res.code];
    Toast.show({
      content: errorText,
    });
  }
};

// export default request;
/**
 * 配置request请求时的默认参数
 */
export const request: RequestConfig = {
  timeout: 1000,
  errorHandler,
  errorConfig: {
    adaptor:  (resData) => {
      return {
        ...resData,
        success: resData.code === 200,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [ midWare ],
  requestInterceptors: [ reqInterceptor ],
  responseInterceptors: [ resInterceptor ],
};
