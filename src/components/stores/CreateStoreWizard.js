import React, { useState } from 'react';
import Location from '../../models/Location';
import Store from '../../models/Store';
import AddStoreInformation from './AddStoreInformation';
import AddStoreLocations from './AddStoreLocations';
import AddStorePhotos from './AddStorePhotos';
import './CreateStoreWizard.css';

function CreateStoreWizard(){
    const [store,setStore] = useState(new Store({}));
    const [location,setLocation] = useState(new Location({city:"hola"}));
    const [photos,setPhotos] = useState([]);
    const stepImages = ["store_construction.jpg","4323579.jpg","4063893.jpg"];
    let currentImage = "";

    const [creationStep, setStep] = useState(validateActualStep());

    function validateActualStep(){
        if (store?.locations.length > 0 && store?.photos.length > 0){
            currentImage = stepImages[2];
            return 3;
        }
        else if(store?.locations.length > 0){
            currentImage = stepImages[1];
            return 2;
        }
        else{
            currentImage = stepImages[0];
            return 1;
        }

    }

    function StepComponent(){
        switch(creationStep){
            case 1: return <AddStoreInformation store={store} handleSubmitAction={handleSubmitAction}/>
            case 2: return <AddStoreLocations location={location} setLocation={setLocation} handleSubmitAction={handleSubmitAction}/>
            case 3: return <AddStorePhotos photos={photos} setPhotos={setPhotos} handleSubmitAction={handleSubmitAction}/>
            default: break;
        }
    }

    function handleSubmitAction(event){
        event.preventDefault();
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

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <h2>Create Store</h2>
                <span class="step-current"> <span class="step-current-content"><span class="step-number"><span>0{creationStep}</span>/0{stepImages.length}</span></span> </span>
                <div className="state-form">
                    <figure className="state-image-container">
                        <img className="state-image" src={'/static/images/page/'+currentImage} alt=""/>
                    </figure>
                    <StepComponent store = {store} handleSubmitAction={handleSubmitAction}/>
                </div>
            </div>
        </div>
    )
}

export default CreateStoreWizard;