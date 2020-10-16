import React, { useState } from 'react';
import Location from '../../models/Location';
import Store from '../../models/Store';
import AddStoreInformation from './AddStoreInformation';
import AddStoreLocations from './AddStoreLocations';
import AddStorePhotos from './AddStorePhotos';
import './CreateStoreWizard.css';

function CreateStoreWizard(){
    const [store,setStore] = useState(new Store({}));
    const [location,setLocation] = useState(new Location({}));
    const [photos,setPhotos] = useState([]);
    const stepImages = ["store_construction.jpg","4323579.jpg","4063893.jpg"];

    const [creationStep, setStep] = useState(validateActualStep());

    function validateActualStep(){
        if (store?.locations.length === 0 && store?.photos.length === 0 && !store.name){
            return 1;
        }
        else if (store?.locations.length > 0 && store?.photos.length === 0){
            return 3;
        }
        else if(store?.locations.length === 0){
            return 2;
        }
        else{
            return 4;
        }

    }

    function StepComponent(){
        switch(creationStep){
            case 1: return <AddStoreInformation store={store} setStore={setStore}  handleNext={handleNextAction}/>
            case 2: return <AddStoreLocations location={location} setLocation={setLocation} handleNext={handleNextAction} handleBack={handleBackAction}/>
            case 3: return <AddStorePhotos photos={photos} setPhotos={setPhotos} handleFinish={handleNextAction} handleBack={handleNextAction}/>
            default: break;
        }
    }

    function handleNextAction(){
        //////////////////add basic info to the store///////////////////
        if(location.city){
            setStore({...store, ...store.locations.push(new Location(location))});
        }
        //////////////////add photos info to the store////
        if(photos.length > 0){
            setStore({...store, ...store.photos = photos.slice()})
        }
        setStep(validateActualStep());
    }

    function handleBackAction(){
        setStep(creationStep-1);
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Create Store</h2>
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

export default CreateStoreWizard;