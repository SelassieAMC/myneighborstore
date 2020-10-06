class Location{
    constructor(data){
        this.id = data.id;
        this.address = data.address;
        this.city = data.city;
        this.country = data.country;
        this.coordinates = data.coordinates;
        this.isenabled = data.isenabled;
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

    getIsEnabled(){
        return this.isenabled;
    }

    getCoordinates(){
        return this.coordinates;
    }
}

export default Location;