class Store{
    constructor(store){
        this.id = store.id;
        this.name = store.name;
        this.description = store.description;
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
}

export default Store;