import React from 'react';
import './Basic.css';
import './MySubmitButton.css';

function MySubmitButton({textButton, type, onClickHandler}){
    return (
        <button className="contact50-form-btn" type={type} onClick={onClickHandler}>
            <span>
                {textButton}
            </span>
        </button>
    )
}

export default MySubmitButton;