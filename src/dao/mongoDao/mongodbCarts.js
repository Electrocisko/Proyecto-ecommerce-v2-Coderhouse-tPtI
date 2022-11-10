import MongoDBcontainer from "./mongodbContainer.js";
import { collection, cartsSchema } from "../models/cart.model.js";
import { ObjectId } from "mongodb";
import logger from "../../config/winston.config.js";

export default class MongoCarts extends MongoDBcontainer {
  constructor() {
    super(collection, cartsSchema);
  }

  getById = async (id) => {
    try {
      if (!ObjectId.isValid(id)) {
        return null;
      }
      let result = await this.model.find({ _id: id }).lean();
      if (Object.keys(result).length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      logger.log("error", `Error mongodb getById  ${error}`);
    }
  };

  getByIdAndPopulate = async (id) => {
    let result = await this.model
      .find({ _id: id })
      //.lean()
      //.populate("products");
    return result;
  };

  saveCart = async () => {
    let result = await this.model.create({ products: [] });
    return result;
  };

  update = async (id,cart) =>{
   let result = await this.model.findByIdAndUpdate(id,{$set:{products:cart.products}})


  logger.log('debug',`update cart ${JSON.stringify(result)}`)
   return result
}
}

export default class MongoCarts extends MongoDBcontainer{
    constructor(){
        super(collection,cartsSchema);
    }
}