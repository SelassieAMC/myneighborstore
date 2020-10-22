import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import Photo from '../../models/Photo';
import Store from '../../models/Store';
import AddStoreInformation from './AddStoreInformation';
import AddStoreLocations from './AddStoreLocations';
import AddStorePhotos from './AddStorePhotos';
import * as storeActions  from '../../redux/actions/storeActions'
import './styles/StoreCreation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function CreateStoreWizard({history, ...props}){
    const [store,setStore] = useState(new Store({}));
    const [photos,setPhotos] = useState([]);
    const stepImages = ["store_construction.jpg","Location-Map-Pin.jpg","shop.png"];

    const [creationStep, setStep] = useState(validateActualStep());

    function validateActualStep(){
        if (store?.locations.length === 0 && store?.photos.length === 0 && !store.name){
            return 1;
        }
        else if(store?.locations.length === 0 ){
            return 2;
        }
        else if (store?.locations.length > 0 && store?.photos.length === 0){
            return 3;
        }
        else{
            return 4;
        }
    }

    function StepComponent(){
        switch(creationStep){
            case 1: return <AddStoreInformation store={store} setStore={setStore}  handleNext={handleNextAction}/>
            case 2: return <AddStoreLocations store={store} setStore={setStore} handleNext={handleNextAction} handleBack={handleBackAction}/>
            case 3: return <AddStorePhotos photos={photos} setPhotos={setPhotos} handleFinish={handleFinish} handleBack={handleBackAction}/>
            default: break;
        }
    }

    function handleNextAction(){
        if(photos.length > 0){
            setStore({...store, ...store.photos = photos.slice()})
        }
        setStep(creationStep+1);
    }

    function handleBackAction(){
        setStep(creationStep-1);
    }

    function handleFinish(files){
        let photosData = [];
        for(let i=0; i< files.length; i++){
            let photo = new Photo({});
            photo.name = files[i].name;
            photo.category = 1;
            photo.photoFile = files[i];
            photosData.push(photo);
        }
        setStore({...store, ...store.photos = photosData});
        props.actions.createStore(store)
                    .then(() => {
                        toast.success("Store saved succesfully");
                        history.push('/stores');
                    }).catch(error => {
                        toast.error(error);
                    });
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Create Store</h2>
                <div className="steps">
                    <ul role="tablist">
                        <li role="tab" aria-disabled="false" aria-selected>
                            <span className=
                                {`number 
                                    ${creationStep === 1 ? "step-active":""}
                                    ${creationStep > 1 ? "step-passed":""}
                                `}
                            >
                                {creationStep > 1 ? 
                                <FontAwesomeIcon icon={faCheck} size="lg" className="plus-icon" /> :
                                1
                                }
                            </span>
                        </li>
                        <li role="tab" aria-disabled="false" aria-selected>
                            <span className=
                                {`number 
                                    ${creationStep === 2 ? "step-active":""}
                                    ${creationStep > 2 ? "step-passed":""}
                                `}
                            >
                                2
                            </span>
                        </li>
                        <li role="tab" aria-disabled="false" aria-selected>
                            <span 
                                className=
                                {`number 
                                    ${creationStep===3 ? "step-active":""}
                                    ${creationStep > 3 ? "step-passed":""}
                                `}
                            >
                                3
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="state-form">
                    <figure className="state-image-container">
                        <img className="state-image" src={'/static/images/page/'+stepImages[creationStep-1]} alt=""/>
                    </figure>
                    <StepComponent/>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            createStore: bindActionCreators(storeActions.saveStore, dispatch)
        }
    }
}


export default connect( null, mapDispatchToProps) (CreateStoreWizard);