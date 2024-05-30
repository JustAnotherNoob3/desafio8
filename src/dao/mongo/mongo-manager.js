
export default class DaoMongo {
    constructor(model) {
        this.model = model.mongo;
    }
    get() {
        return this.model.find()
    }
    getById(id) {
        return this.model.findById(id);
    }
    getByOther(filter) {
        return this.model.find(filter);
    }
    getOneByOther(filter) {
        return this.model.findOne(filter);
    }
    getPaginated(filter, extra){
        return this.model.paginate(filter, extra);
    }
    delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    deleteMany(filter){
        return this.model.deleteMany(filter);
    }
    create(obj){
        return this.model.create(obj);
         
    }
    update(id, obj){
        return this.model.findByIdAndUpdate(id,obj);
    }
    updateMany(filter, obj){
        return this.model.updateMany(filter, obj);
    }
    saveChangesOnObject(obj){
        return obj.save();
    }
}
