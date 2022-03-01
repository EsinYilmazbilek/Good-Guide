import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, min: 0, max: 10 },
} , {
  timestamps: true,
})

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  clothing: { type: Boolean, required: true },
  footwear: { type: Boolean, required: true },
  multipleConnections: { type: Boolean, required: true },
  singleConnection: { type: Boolean, required: true },
  logo: { type: String, required: true },
  copy: { type: String, required: true },
  comments: [commentSchema],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})
//* here - undefined
console.log(brandSchema.addedBy)

brandSchema
  .virtual('Average Rating')
  .get(function() {
    if (!this.comments.length) return 'No Average Rating Yet'

    return Math.round(this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / this.comments.length)
  })

brandSchema
  .set('toJSON', {
    virtuals: true,
  })

brandSchema.plugin(mongooseUniqueValidator)


export default mongoose.model('Brands', brandSchema)


// type: { type: String, required: true },



//const Brands = mongoose.model('Brands', brandsSchema)