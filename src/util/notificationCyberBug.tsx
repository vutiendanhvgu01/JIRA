import { notification } from "antd";

export const notifiFucntion = (type: any, message: any, description = "") => {
  notification[type]({
    message: message,
    description: description,
  });
};
