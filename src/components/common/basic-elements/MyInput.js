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
        value,
        isMultiple,
        onChangeHandler,
        isDisabled = false,
        hidden = false
    }
    
    ){
    return (
        <div hidden={hidden} className={`wrap-input100 validate-input bg1 ${styleclass}`} data-validate={msgValidation}>
            <span className="label-input100">{txtLabel} {isMandatory ? '*' : '' }</span>
            <input 
                onChange={onChangeHandler} 
                className="input100" 
                disabled={isDisabled}
                multiple={isMultiple} 
                type={type} 
                defaultValue={value} 
                name={name} 
                placeholder={msgPlaceHolder}/>
        </div>
    )
}