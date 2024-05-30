import mongoose from "mongoose";
import { models, DTOs } from "./models.js";
export default class DaoMemory {
    
    constructor(model) {
        this.model = model.file;
    }
    
    async get() {
        return models[this.model].map(x => new DTOs[this.model](x))
    }
    async getById(id) {
        console.log(id);
        console.log(models[this.model]);
        if (models[this.model].some(x => x._id == id))
        return new DTOs[this.model](models[this.model].find(x => x._id == id));
        return undefined;
    }
    async getByOther(filter) {
        if(models[this.model].some(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }))
        return models[this.model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        })
        return undefined;
    }
    async getOneByOther(filter) {
        if(models[this.model].some(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }))
        return new DTOs[this.model](models[this.model].find(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }));
        return undefined;
    }
    async getPaginated(filter, extra){
        let limit = (extra.limit * extra.page);
        let i = (extra.page - 1) * extra.limit;
        let totalPages = Math.ceil(models[this.model].length / extra.limit);
        let hasPrevPage = extra.page - 1 > 0;
        let hasNextPage = extra.page + 1 <= totalPages
        return {docs:models[this.model].slice(i, limit), totalPages: totalPages, page: extra.page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevPage: hasPrevPage ? extra.page-1 : null, nextPage:hasNextPage ? extra.page+1 : null}
    }
    async delete(id) {
        let i = models[this.model].findIndex(x => x._id == id);
        if (i == -1) throw new Error("No object with id.");
        return models[this.model].splice(i, 1);
    }
    async deleteMany(filter){
        models[this.model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }).forEach(x => this.delete(x._id));
    }
    async create(obj){
        let id =  new mongoose.Types.ObjectId()
        obj.id = undefined;
        models[this.model].push({_id: id, ...obj});
        return id;
    }
    async update(id, obj){
        let index = models[this.model].findIndex((element) => element.id === id);
        let newObj = models[this.model][index];
        Object.keys(newObj).forEach((element) => {
            if (element === "_id") return;
            if (obj[element] === undefined) return;
            newObj[element] = obj[element];
        })
        models[this.model][index] = newObj;
    }
    async updateMany(filter, obj){
        models[this.model].filter(x => {
            let bool = true;
            Object.keys(filter).forEach(y => {if(x[y] != filter[y]) bool = false});
            return bool;
        }).forEach(x => this.update(x._id, obj));
    }
    async saveChangesOnObject(obj){
        this.update(obj.id, obj)
    }
}
