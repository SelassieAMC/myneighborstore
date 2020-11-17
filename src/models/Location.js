class Location{
    constructor(data){
        this.id = data.id;
        this.address = data.address;
        this.countryId = data.countryId;
        this.country = data.country;
        this.stateId = data.stateId;
        this.state = data.state;
        this.cityId = data.cityId;
        this.city = data.city;
        this.localityId = data.localityId;
        this.locality = data.locality;
        this.neighborId = data.neighborId;
        this.neighbor = data.neighbor;
        this.coordinates = data.coordinates;
        this.isenable = data.isenable ?? true;
        this.storeid = data.storeid;
        this.uuid = data.uuid;
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