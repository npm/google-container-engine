'use strict'

const common = require('@google-cloud/common')
const is = require('is')
const util = require('util')

function Operation (container, id) {
  var methods = {
    get: true,
    getMetadata: true
  }

  common.ServiceObject.call(this, {
    parent: container,
    baseUrl: '/operations',
    id: id,
    methods: methods
  })

  this.container = container
  this.id = id
}

util.inherits(Operation, common.ServiceObject)

common.util.promisifyAll(Operation, {
  exclude: []
})

module.exports = Operation
