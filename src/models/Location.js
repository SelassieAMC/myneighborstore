class Location{
    constructor(data){
        this.id = data.id;
        this.address = data.address;
        this.city = data.city;
        this.country = data.country;
        this.coordinates = data.coordinates;
        this.isenable = data.isenable ?? true;
        this.storeid = data.storeid;
    }

    getId(){
        return this.id;
    }

    getAddress(){
        return this.address;
    }

    getCity(){
        return this.city;
    }

    getCountry(){
        return this.country;
    }

    getIsEnable(){
        return this.isenable;
    }

    getCoordinates(){
        return this.coordinates;
    }

    getStoreId(){
        return this.storeid;
    }
}

export default Location;