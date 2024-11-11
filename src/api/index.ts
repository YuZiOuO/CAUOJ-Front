import _axios, { AxiosError } from 'axios';
import { ErrorMessage } from './type';

const ApiPath = {
  PROBLEM: '/api/core/problem',
  SOLUTION: '/api/core/solution',
  SUBMIT: '/api/judge/submit'
};

function resolveError(error: any): ErrorMessage {
  const err = error as AxiosError;
  if (err.response) {
    if (err.response.data && err.response.headers['content-type'] === 'application/json') {
      return ErrorMessage.from(err.response.data);
    } else {
      return new ErrorMessage(err.response.status, err.response.statusText);
    }
  } else if (err.request) {
    return new ErrorMessage(0, '请求失败');
  } else {
    return new ErrorMessage(-1, err.message);
  }
}

const axios = _axios.create();

export default axios;
export { ApiPath, resolveError };
