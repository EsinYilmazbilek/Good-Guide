// console.log('seed the database')

import brandsData from './data/brands.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'
import Brand from '../models/brand.js'
import User from '../models/user.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await truncateDb()
    console.log('🤖 Data Dropped')

    const user = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
      avatar: 'https://i.imgur.com/6HRALmW.jpg?1',
    })

    console.log('🤖 Admin user created')

    brandsData.forEach(brand => {
      brand.addedBy = user
    })

    const createdBrands = await Brand.create(brandsData)
    console.log(`🤖 ${createdBrands.length} brands created`)

  } catch (err) {
    console.log('🤖 Something went wrong seeding the DB')
    console.log(err)
  }
  await disconnectDb()
  console.log('🤖 Goodbye')
}

seed()