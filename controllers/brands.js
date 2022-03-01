//26. we also add the req.body.added to pokemonCreate req.currentUser so it shows who added it when searched

import Brand from '../models/brand.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

//* Get All Brands
async function brandIndex (_req, res, next) {
  try {
    const brands = await Brand.find()
    return res.status(200).json(brands)
  } catch (err) {
    next(err)
  }

}

//* Create A Brand
async function brandCreate (req, res, next) {
  const { currentUser } = req
  try {
    const createdBrand = await Brand.create({ ...req.body, addedBy: currentUser })
    return res.status(200).json(createdBrand)
  } catch (err) {
    next(err)
  }
}

//* Get A Brand
async function brandShow (req, res, next) {
  const { brandId } = req.params
  try {
    const brandToFind = await Brand.findById(brandId)
      .populate('addedBy')
      .populate('comments.addedBy')
    if (!brandToFind){
      throw new NotFound()
    }
    return res.status(200).json(brandToFind)
  } catch (err) {
  
    next(err)
  }
}

//* Update A Brand
async function brandUpdate(req, res, next) {
  const { brandId } = req.params
  const { currentUserId } = req
  try {
    const brandToUpdate = await Brand.findById(brandId)
    if (!brandToUpdate) {
      throw new NotFound()
    }
    if (!brandToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
      // this Unauthorized doesn't go green??
    }
    Object.assign(brandToUpdate, req.body)
    await brandToUpdate.save()
    return res.status(202).json(brandToUpdate)
  } catch (err) {
    next(err)
  }
}

//* Delete A Brand
async function brandDelete (req, res, next) {
  const { brandId } = req.params
  const { currentUserId } = req
  try {
    const brandToRemove = await Brand.findById(brandId)
    if (!brandToRemove) {
      throw new NotFound()
    }
    if (!brandToRemove.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    // this Unauthorized doesn't go green??
    }
    await brandToRemove.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function brandCommentCreate(req, res, next) {
  const { brandId } = req.params
  const { currentUser } = req
  try {
    const commentedBrand = await Brand.findById(brandId)
    if (!commentedBrand) {
      throw new NotFound()
    }
    const comment = commentedBrand.comments.create({ ...req.body, addedBy: currentUser })
    commentedBrand.comments.push(comment)
    await commentedBrand.save()
    return res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

async function brandCommentDelete(req, res, next) {
  const { brandId, commentId } = req.params
  const { currentUserId } = req
  try {
    const brand = await Brand.findById(brandId)
    if (!brand) {
      throw new NotFound()
    }
    const commentToDelete = brand.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }

    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }

    commentToDelete.remove()
    // why don't we say commentToDelete.remove(req.body)?
    await brand.save()
    return res.status(204)
  } catch (err) {
    next(err)
  }
}


export default {
  index: brandIndex,
  create: brandCreate,
  show: brandShow,
  update: brandUpdate,
  delete: brandDelete,
  commentCreate: brandCommentCreate,
  commentDelete: brandCommentDelete,
}
