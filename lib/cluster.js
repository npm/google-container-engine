'use strict'

const common = require('@google-cloud/common')
const is = require('is')
const util = require('util')

function Cluster (container, id) {
  var methods = {
    get: true
  }

  common.ServiceObject.call(this, {
    parent: container,
    baseUrl: '/clusters',
    id: id,
    methods: methods
  })

  this.container = container
  this.id = id
}

util.inherits(Cluster, common.ServiceObject)

// see: https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters
Cluster.prototype.create = function (name, config, callback) {
  var query = {}
  var body = Object.assign({
    initial_node_count: 3,
    node_config: {
      oauth_scopes: [
        'https://www.googleapis.com/auth/compute',
        'https://www.googleapis.com/auth/devstorage.read_only'
      ]
    }
  }, config, {
    name: name
  })

  this.request({
    method: 'POST',
    uri: '',
    qs: query,
    json: {cluster: body}
  }, (err, resp) => {
    if (err) {
      callback(err, null, null, resp)
      return
    }

    // perhaps return a new cluster object?
    // var disk = self.disk(name);
    // var operation = self.operation(resp.name);
    // operation.metadata = resp;

    callback(null, resp)
  })
}

Cluster.prototype.getClusters = function (options, callback) {
  if (is.fn(options)) {
    callback = options
    options = {}
  }

  options = options || {}

  this.request({
    uri: '',
    qs: options
  }, (err, resp) => {
    if (err) {
      callback(err, null, null, resp)
      return
    }

    var nextQuery = null

    if (resp.nextPageToken) {
      nextQuery = Object.assign({}, options, {
        pageToken: resp.nextPageToken
      })
    }

    var clusters = (resp.clusters || []).map((cluster) => {
      // one might new a cluster here.
      // var diskInstance = self.disk(disk.name)
      // diskInstance.metadata = disk
      return cluster
    })

    callback(null, clusters, nextQuery, resp)
  })
}

common.paginator.extend(Cluster, [
  'getClusters'
])

common.util.promisifyAll(Cluster, {
  exclude: []
})

module.exports = Cluster
