import Location from "./Location";
import Photo from "./Photo";

class Store{
    constructor(store){
        this.id = store.id;
        this.name = store.name;
        this.description = store.description;
        this.email = store.email;
        this.phone = store.phone;
        this.locations = [];
        this.photos = [];

        if(store.locations?.length > 0){
            store.locations.forEach(element => {
                this.locations.push(new Location(element));
            });
        }
        if(store.photos?.length > 0){
            store.photos.forEach(element => {
                this.photos.push(new Photo(element));
            });
        }
    }


    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getDescription(){
        return this.description;
    }

    getEmail(){
        return this.email;
    }

    getPhone(){
        return this.phone;
    }

    getLocations(){
        return this.locations;
    }

    getPhotos(){
        return this.photos;
    }
}

export default Store;