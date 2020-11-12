import React, { useState } from 'react';
import MyInput from '../common/basic-elements/MyInput';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import { toast } from 'react-toastify';

function AddStorePhotos({ photos, handleFinish, handleBack, viewMode}){

    const [existImages, setExists] = useState(photos.length > 0 ? true : false);
    const [images, setImages] = useState(getUris());
    let index = 0;

    function getUris(){
        let uris = [];
        if(photos.length > 0){
            photos.map(element => {
                return uris.push(element.urlAccess)
            });
        }
        return uris;
    }

    function handleSubmitAction(event){
        event.preventDefault();
        const files = event.target[0].files;
        if(!existImages){
            toast.error("Must exist at least one photo to upload");
            return;
        }
        if(files.length){
            handleFinish(files);
        }
    }

    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };
    
    const onChangeHandler = async event => {
        const files = event.target.files;
        const arrayImages = [];
        if(files.length > 0){
            for(let i=0; i< files.length; i++ ){
                const image = await readURL(files[i])
                                        .then(setExists(true));
                arrayImages.push(image);
            }
            setImages(arrayImages);
        }else{
            setExists(false);
        }
    }

    return (
        <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
            <MyInput 
                msgValidation = "Select min 1 photo and max 5" 
                txtLabel = "Store Photos"
                isMandatory
                type = "file"
                name = "photos"
                isMultiple
                onChangeHandler={onChangeHandler}
                isDisabled={viewMode}
                hidden={viewMode}
            />
            {
                existImages && images.length > 0 ? 
                <div className="container-images">
                    {
                        images?.map( image => {
                            return (
                                <div className="preview-upload" key={index++}>
                                    <img  src={image} alt="preload"/>
                                </div>
                            )
                        })
                    }
                </div> :

                <></>
            }
            <div className="container-contact100-form-btn">
                <MySubmitButton textButton="Finish" type="submit" styleClass="contact50-form-btn" isHidden={viewMode}/>
                <MySubmitButton textButton="Back" onClickHandler={handleBack} styleClass="contact50-form-btn" isHidden={viewMode}/>
            </div>

        </form>
    );
}
export default AddStorePhotos;