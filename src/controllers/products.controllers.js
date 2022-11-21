import logger from "../config/winston.config.js";
import { ObjectId } from "mongodb";
import {
  getAllProducts,
  saveProducts,
  getProductById,
  deleteProductById,
  updateProduct,
} from "../services/products.services.js";

const getProductsController = async (req, res) => {
  try {
    let data = await getAllProducts();
    return res.status(200).json(data);
  } catch (error) {
    logger.log("error", `Error in getProductsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get products" });
  }
};

const postProductsController = async (req, res) => {
  try {
    if (!req.file.filename)
      return res
        .status(500)
        .send({ status: "error", error: "Error loading image" });
    const data = req.body;
    data.thumbnail = req.file.filename;
    if (
      !data.name ||
      !data.description ||
      !data.code ||
      !data.price ||
      !data.stock 
    )
      return res
        .status(400)
        .send({ status: "error", error: "incomplete values" });
    await saveProducts(data);
    res.status(201).json(data);
  } catch (error) {
    logger.log("error", `Error in getProductsController ${error} `);
    res.status(500).send({ error: error, message: "couldnt save products" });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let data = await getProductById(pid);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent product" });
    return res.status(200).json(data);
  } catch (error) {
    logger.log("error", `Error in getProductByIdController ${error} `);
    res.status(500).send({ error: error, message: "couldnt get product" });
  }
};

const deleteProductByIdControler = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let data = await deleteProductById(pid);
    if (!data)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent product" });
    return res.status(200).send({
      "Product Removed": data,
    });
  } catch (error) {
    logger.log("error", `Error in deleteProductByIdController ${error} `);
    res.status(500).send({ error: error, message: "couldnt delete product" });
  }
};

const updateProductControler = async (req, res) => {
  try {
    let pid = req.params.pid;
    if (!ObjectId.isValid(pid))
      return res.status(400).send({ status: "error", error: "invalid id" });
    let newData = req.body;
    if (req.file !== undefined) {
      newData.thumbnail = req.file.filename;
    }
    let result = await updateProduct(pid, newData);
    if (result.modifiedCount === 0)
      return res
        .status(400)
        .send({ status: "error", error: "nonexistent product" });
    return res.status(201).send({
      message: "Modified product",
      status: result,
    });
  } catch (error) {
    logger.log("error", `Error in updateProductController ${error} `);
    res.status(500).send({ error: error, message: "couldnt update product" });
  }
};

export {
  getProductsController,
  postProductsController,
  getProductByIdController,
  deleteProductByIdControler,
  updateProductControler,
};
