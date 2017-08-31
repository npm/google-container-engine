// see: https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters

const common = require('@google-cloud/common')
const util = require('util')
const Cluster = require('./lib/cluster')

function Container (options) {
  if (!(this instanceof Container)) {
    options = common.util.normalizeArguments(this, options)
    return new Container(options)
  }

  var config = {
    baseUrl: `https://container.googleapis.com/v1/projects/${options.projectId}/zones/${options.zone}`,
    projectIdRequired: false,
    scopes: [
      'https://www.googleapis.com/auth/compute'
    ],
    packageJson: require('./package.json')
  }

  common.Service.call(this, config, options)
}

Container.prototype.cluster = function (id) {
  return new Cluster(this, id)
}

util.inherits(Container, common.Service)

module.exports = Container
