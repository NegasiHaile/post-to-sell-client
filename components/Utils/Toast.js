import React from "react";
import { toast } from "react-toastify";
export default function Toast(type, msg) {
  console.log(type);
  return toast[type](msg, {
    position: "top-right",
    theme: "colored",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
