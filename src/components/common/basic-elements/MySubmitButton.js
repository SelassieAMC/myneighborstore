import React from 'react';
import './Basic.css';
import './MySubmitButton.css';

function MySubmitButton({textButton, type, onClickHandler, styleClass, disabled, isHidden = false}){
    return (
        <button disabled={disabled} hidden={isHidden} className={styleClass} type={type} onClick={onClickHandler}>
            <span>
                {textButton}
            </span>
        </button>
    )
}

export default MySubmitButton;