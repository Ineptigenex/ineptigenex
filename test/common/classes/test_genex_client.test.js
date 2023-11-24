const { expect } = require('chai')
const GenexClient = require('../../../src/common/classes/GenexClient')

describe('Genex Client', function() {

  describe('GenexClient constructor', () => {

    it('should create a new GenexClient object', () => {
      const genexClient = new GenexClient()
      expect(genexClient).to.be.an.instanceof(GenexClient)
    })

    it('should have a slashCommands property', () => {
      const genexClient = new GenexClient()
      expect(genexClient).to.have.property('slashCommands')
    })

    it('should have a slashCommands property of type Collection', () => {
      const genexClient = new GenexClient()
      expect(genexClient.slashCommands).to.be.an.instanceof(require('discord.js').Collection)
    })

  })

})
