import express from 'express'
import brands from '../controllers/brands.js'

import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'


const router = express.Router()

router.route('/brands')
  .get(brands.index)
  .post(secureRoute, brands.create)

router.route('/brands/:brandId')
  .get(brands.show)
  .put(secureRoute, brands.update)
  .delete(secureRoute, brands.delete)

router.route('/brands/:brandId/comments')
  .post(secureRoute, brands.commentCreate)

router.route('/brands/:brandId/comments/:commentId')
  .delete(secureRoute, brands.commentDelete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

export default router