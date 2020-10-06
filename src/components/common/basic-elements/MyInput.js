import React from 'react';
import './Basic.css';
import './MyInput.css';

export default function MyInput(
    {   msgValidation, 
        txtLabel, 
        isMandatory, 
        msgPlaceHolder, 
        styleclass, 
        type,
        name,
        value
    }
    
    ){
    return (
        <div className={`wrap-input100 validate-input bg1 ${styleclass}`} data-validate={msgValidation}>
					<span className="label-input100">{txtLabel} {isMandatory ? '*' : '' }</span>
					<input className="input100" type={type} value={value} name={name} placeholder={msgPlaceHolder}/>
        </div>
    )
}