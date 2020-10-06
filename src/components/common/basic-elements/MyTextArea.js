import React from 'react';
import './Basic.css';
import './MyTextArea.css';

function MyTextArea(
    {
        msgValidation,
        txtLabel, 
        isMandatory, 
        msgPlaceHolder, 
        name,
        value
    }){
    return (
        <div className="wrap-input100 validate-input bg1 rs1-alert-validate" data-validate = {msgValidation}>
            <span className="label-input100">{txtLabel} {isMandatory ? '*' : '' }</span>
            <textarea className="input100" name={name} value={value} placeholder={msgPlaceHolder}></textarea>
        </div>
    )
}

export default MyTextArea;