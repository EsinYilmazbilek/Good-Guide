export class NotFound extends Error {
  constructor() {
    super()
    this.name = 'NotFound'
  }
}
//export to pokemons.js in controllers

export class Unauthorized extends Error {
  constructor() {
    super()
    this.name = 'Unauthorized'
  }
}
//go to auth.js to add it into login function