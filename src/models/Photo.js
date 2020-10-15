class Photo{
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.urlAccess = data.urlAccess;
        this.isEnable = data.isEnable ?? true;
        this.storeId = data.storeId;
        this.photoFile = data.photoFile;
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

    getIsEnable(){
        return this.isenable;
    }

    getStoreId(){
        return this.storeid;
    }
}

export default Photo;