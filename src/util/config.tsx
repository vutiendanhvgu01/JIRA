import axios from "axios";
import { history } from "..";

export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c"
export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } =
  {
    saveStore: (name:string, stringValue:string) => {
      localStorage.setItem(name, stringValue);
      return stringValue;
    },
    saveStoreJson: (name:string, value:any) => {
      let sValue = JSON.stringify(value);
      localStorage.setItem(name, sValue);
      return value; //object
    },
    getStore: (name:string):string|null|undefined => {
      if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      }
      return null;
    },
    getStoreJson: (name:string):any |undefined => {
      if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
      }
      return null;
    },
    removeStore: (name:string) => {
      if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
      }
    },
  };

//Cấu hình cho tất các request api

export const http = axios.create({
    baseURL:'https://jiranew.cybersoft.edu.vn',
    timeout:3000
})

http.interceptors.request.use((config:any) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBERSOFT
    };
    return config;
}, (err) => {
    return Promise.reject(err);
})

// export const httpb = axios.create({
//     baseURL:'https://shop2.cyberlearn.vn'
// })
//Cấu hình cho tất cả các response api
http.interceptors.response.use((res)=>{
    return res;
}, (err) => {
    //Bắt lỗi 400 hoặc 404
    if(err.response?.status === 400 || err.response?.status === 404) {
        //Lỗi do tham số => backend trả về 400 hoặc 404 mình sẽ xử lý
        alert('tham số không hợp lệ !');
        //chuyển hướng về home
        history.push('/');
    }
    if(err.response?.status === 401 || err.response.status === 403) {
            alert('Hết phiên đăng nhập yêu cầu đăng nhập lại !');
            removeStore(ACCESS_TOKEN);
            removeStore(USER_LOGIN);
            //Chuyển hướng trang dạng f5
            window.location.href = '';
 
        history.push('/login');
    }
    return Promise.reject(err);
})






/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/