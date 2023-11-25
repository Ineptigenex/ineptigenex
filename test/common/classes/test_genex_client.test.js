const { expect } = require('chai')
const GenexClient = require('../../../src/common/classes/GenexClient')
const Database = require('../../../src/common/utils/Database')

describe('Genex Client', function() {

  describe('GenexClient constructor', () => {

    const genexClient = new GenexClient()

    it('should create a new GenexClient object', () => {
      expect(genexClient).to.be.an.instanceof(GenexClient)
    })

    it('should have a slashCommands property', () => {
      expect(genexClient).to.have.property('slashCommands')
    })

    it('should have a slashCommands property of type Collection', () => {
      expect(genexClient.slashCommands).to.be.an.instanceof(require('discord.js').Collection)
    })

  })

  describe('GenexClient.start() function', async () => {

    let dbSandbox, clientSandbox
    const genexClient = new GenexClient()

    before(() => {
      dbSandbox = require('sinon').stub(Database, 'connect').resolves()
      clientSandbox = require('sinon').stub(genexClient, 'login').resolves()
    })
    after(() => {
      dbSandbox.restore()
      clientSandbox.restore()
    })

    it('should call the Database.connect() function', async () => {
      genexClient.start()

      expect(Database.connect.calledOnce).to.be.true
    })

    it('should call the Client.login() function', async () => {
      genexClient.start()

      expect(clientSandbox.calledOnce).to.be.true
    })

  })

  describe('GenexClient.start() function failure', async () => {

    let dbSandbox, clientSandbox
    const genexClient = new GenexClient()

    before(() => {
      dbSandbox = require('sinon').stub(Database, 'connect').rejects()
      clientSandbox = require('sinon').stub(genexClient, 'login').resolves()
    })
    after(() => {
      dbSandbox.restore()
      clientSandbox.restore()
    })

    it('should call the Database.connect() function', async () => {
      genexClient.start()

      expect(dbSandbox.calledOnce).to.be.true
    })

    it('should not call the Client.login() function', async () => {
      genexClient.start()

      expect(clientSandbox.calledOnce).to.be.false
    })

  })

})
