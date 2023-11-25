// Import the necessary modules
const mongoose = require('mongoose')
const Database = require('../../../src/common/utils/Database')
const { expect } = require('chai')
const Sinon = require('sinon')
const Logger = require('../../../src/common/classes/Logger')

// Test suite
describe('Database', function () {

  describe('Database.connection() function success', () => {

    let sandbox

    // before(() => {
    //   sandbox = Sinon.stub(mongoose, 'connect').resolves().callsFake(() => {
    //     mongoose.connection.readyState = 1
    //   })
    // })
    // after(() => {
    //   sandbox.restore()
    // })

    it('should connect to the database', async () => {

      // Connect to the database
      await Database.connect()

      // Check if the connection is successful
      expect(mongoose.connection.readyState).to.equal(1)
    })
  })

  describe('Database.connection() function failure', () => {

    let sandbox, exitSandbox

    before(() => {
      sandbox = Sinon.stub(mongoose, 'connect').rejects()
      exitSandbox = require('sinon').stub(process, 'exit').callsFake(() => {
        process.exitCode = 1
      })
    })
    after(() => {
      sandbox.restore()
      exitSandbox.restore()
    })

    it('should not connect to the database', async () => {
      await Database.connect()

      expect(exitSandbox.calledOnce).to.be.true
      expect(process.exitCode).to.equal(1)
    })
  })

  describe('Database.disconnect() function success', () => {

    let sandbox

    before(() => {
      sandbox = Sinon.stub(mongoose, 'disconnect').resolves().callsFake(() => {
        mongoose.connection.readyState = 0
      })
    })
    after(() => {
      sandbox.restore()
    })

    it('should disconnect from the database', async () => {
      // Disconnect from the database
      await Database.disconnect()
      // Check if the disconnection is successful
      expect(mongoose.connection.readyState).to.equal(0)
    })
  })

})
