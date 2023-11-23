// Import the necessary modules
const mongoose = require('mongoose')
const Database = require('../../../src/common/utils/Database')
const { expect } = require('chai')
const Sinon = require('sinon')

// Test suite
describe('Database', function () {

  describe('Database.connection() function success', () => {

    let sandbox

    before(() => {
      sandbox = Sinon.stub(mongoose, 'connect').resolves().callsFake(() => {
        mongoose.connection.readyState = 1
      })
    })
    after(() => {
      sandbox.restore()
    })

    it('should connect to the database', async () => {

      // Connect to the database
      await Database.connect()

      // Check if the connection is successful
      expect(mongoose.connection.readyState).to.equal(1)

      // Disconnect from the database
      await mongoose.disconnect()
    })
  })

  describe('Database.connection() function failure', () => {

    let sandbox

    before(() => {
      sandbox = Sinon.stub(mongoose, 'connect').throws()
    })
    after(() => {
      sandbox.restore()
    })

    it('should not connect to the database', async () => {

      await Database.connect()

      expect(mongoose.connection.readyState).to.equal(0)
    })
  })

})
