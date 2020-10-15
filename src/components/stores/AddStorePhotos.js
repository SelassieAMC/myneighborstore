import React, { useState } from 'react';
import MyInput from '../common/basic-elements/MyInput';
import './CreateStore.css';
import MySubmitButton from '../common/basic-elements/MySubmitButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 import Store from '../../models/Store';
import { toast } from 'react-toastify';
import './AddStorePhotos.css';
import Photo from '../../models/Photo';
import * as storeActions from '../../redux/actions/storeActions';
import { bindActionCreators } from 'redux';

function AddStorePhotos({store, history, ...props}){

     const [storeObj] = useState(new Store(store ?? {}));
    const [existImages, setExists] = useState(false);
    const [images, setImages] = useState([]);
    let index = 0;

    function handleSubmitAction(event){
        event.preventDefault();
        const files = event.target[0].files;
        if(!existImages){
            toast.error("Must exist at least one photo to upload");
            return;
        }
        if(files.length){
            let photosData = [];
            for(let i=0; i< files.length; i++){
                let photo = new Photo({});
                photo.name = files[i].name;
                photo.storeId = storeObj.id;
                photo.category = 1;
                photo.photoFile = files[i];
                photosData.push(photo);
            }
            props.actions.saveStorePhotos(photosData)
                            .then( () => {
                                toast.success("Store data saved succesfully");
                                history.push('/stores');
                            }).catch(error => {
                                toast.error(error);
                            });
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
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Add Store Photos</h2>
                <form className="contact100-form validate-form" onSubmit={handleSubmitAction}>
                    <MyInput 
                        msgValidation = "Select min 1 photo and max 5" 
                        txtLabel = "Store Photos"
                        isMandatory
                        type = "file"
                        name = "photos"
                        isMultiple
                        onChangeHandler={onChangeHandler}
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
                        <MySubmitButton textButton="Finish" type="submit" styleClass="contact50-form-btn"/>
                        <Link className="cancel-button" to="/stores">
                            <MySubmitButton textButton="Cancel" styleClass="contact100-form-btn" />
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        store : state.store
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            saveStorePhotos: bindActionCreators(storeActions.saveStorePhotos, dispatch)
        }
    }   
}
export default connect(mapStateToProps, mapDispatchToProps) (AddStorePhotos);