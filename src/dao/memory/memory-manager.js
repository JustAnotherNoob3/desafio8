import mongoose from "mongoose";
import { models, DTOs } from "./models";
export default class DaoMemory {
    
    
    constructor(model) {
        this.model = model.file;
    }
    
    async get() {
        return models[model].map(x => new DTOs[model](x))
    }
    async getById(id) {
        return new DTOs[model](models[model].find(x => x._id == id));
    }
    async getByOther(filter) {
        return models[model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }).map(x => new DTOs[model](x));
    }
    async getPaginated(filter, extra){
        let limit = (extra.limit * extra.page);
        let i = (extra.page - 1) * extra.limit;
        let totalPages = Math.ceil(models[model].length / extra.limit);

        return {docs:models[model].slice(i, limit), totalPages: totalPages, page: extra.page, hasPrevPage: extra.page - 1 > 0, hasNextPage: extra.page + 1 <= totalPages, prevPage: hasPrevPage ? extra.page-1 : null, nextPage:hasNextPage ? extra.page+1 : null}
    }
    async delete(id) {
        let i = models[model].findIndex(x => x._id == id);
        if (i == -1) throw new Error("No object with id.");
        return models[model].splice(i, 1);
    }
    async deleteMany(filter){
        models[model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }).forEach(x => this.delete(x._id));
    }
    async create(obj){
        let id =  new mongoose.Schema.ObjectId()
        models[model].push({_id: id, ...obj});
        return id;
    }
    async update(id, obj){
        let index = models[model].findIndex((element) => element.id === id);
        let newObj = models[model][index];
        Object.keys(newObj).forEach((element) => {
            if (element === "_id") return;
            if (obj[element] === undefined) return;
            newObj[element] = obj[element];
        })
        models[model][index] = newObj;
    }
    async updateMany(filter, obj){
        models[model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }).forEach(x => this.update(x._id, obj));
    }
    async saveChangesOnObject(obj){
        this.update(obj.id, obj)
    }
}
