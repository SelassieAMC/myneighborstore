import React from 'react';
import './Basic.css';
import './MySubmitButton.css';

function MySubmitButton({textButton, type, onClickHandler, styleClass, disabled}){
    return (
        <button disabled={disabled} className={styleClass} type={type} onClick={onClickHandler}>
            <span>
                {textButton}
            </span>
        </button>
    )
}

export default MySubmitButton;