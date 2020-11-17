class baseLocationDetail{
    constructor(data){
        this.id = data.id,
        this.name = data.name
    }
}

class Country extends baseLocationDetail{
    constructor(data){
        super(data);
    }
}

class State extends baseLocationDetail{
    constructor(data){
        super(data);
    }
}

class City extends baseLocationDetail{
    constructor(data){
        super(data);
    }
}

class Locality extends baseLocationDetail{
    constructor(data){
        super(data);
    }
}

class Neighbor extends baseLocationDetail{
    constructor(data){
        super(data);
    }
}