import { history, request } from 'umi';

const authCheck = async (params: any) => {
  return request('/api/userAuth', {
    method: 'POST',
    data: params,
  });
};

const userLogin = async (params: any) => {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
};

const services = {
  authCheck,
  userLogin,
};

export default services;

