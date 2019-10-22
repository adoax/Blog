import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = ({touched, message}) => {
    if (!touched) {
        return <div className="form-message is-invalid">&nbsp;</div>
    }
    if (message) {
        return <div className="form-message is-invalid">{message}</div>
    }

    return <div className="form-message text-success" >Information corect </div>
};

export default Error;