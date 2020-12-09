const ExtendedMap = require("extendedmap");

module.exports = class{
    constructor(cahce, schema){
        this.schema = schema;

        this.cache = cahce || new ExtendedMap();
    }

    async get(id){
        let data = await this.cache.get(id);
        if(!data){
            data = await this.schema.findOne({id: id});
            if(!data) data = await new this.schema({id: id}).save();
            this.cache.set(id, data);
        }
        return data;
    }

    async update(data){
        this.cache.set(data.id, data);
        return await data.save();
    }

    async delete(id){
        await this.schema.findOneAndDelete({id: id});
        return this.cache.delete(id);
    }

}