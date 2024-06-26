import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import {
  addProductToDB,
  deleteProductById,
  getProductById,
  getProductFromDB,
  updateProductById
} from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import ProductType from '../types/product.type'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`, error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  try {
    await addProductToDB(value)
    logger.info('Success add new Product')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add new product success' })
  } catch (error) {
    logger.error(`ERR: product - create = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error, data: {} })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Successs get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    } else {
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data Not Found', data: {} })
    }
    // logger.info('Success get 1 data product')
    // return res.status(200).send({ status: true, statusCode: 200, data: filterProduct[0] })
  } else {
    logger.info('Success get all product')
    return res.status(200).send({ status: true, statusCode: 200, data: products })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  const { error, value } = updateProductValidation(req.body)
  if (error) {
    logger.error(`ERR: product - update = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  try {
    const result = await updateProductById(id, value)
    if (result) {
      logger.info('Success update Product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update product success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error(`ERR: product - update = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const result = await deleteProductById(id)
    if (result) {
      logger.info('Success delete Product')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete product success' })
    } else {
      logger.info('Data not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data not found' })
    }
  } catch (error) {
    logger.error(`ERR: product - delete = ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
