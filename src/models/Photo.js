class Photo{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.urlaccess = data.urlaccess;
        this.isenabled = data.isenabled;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getCategory(){
        return this.category;
    }

    getUrl(){
        return this.urlaccess;
    }

    getIsEnabled(){
        return this.isenabled;
    }
}

export default Photo;