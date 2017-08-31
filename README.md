# Google Container Engine

Node.js bindings to the [Google Container Engine](https://cloud.google.com/container-engine/reference/rest/v1/projects.zones.clusters) REST API.

_tldr; show me how it works:_

```js
const gce = require('@npm/container-engine')({
  projectId: 'npm-inc',
  zone: 'us-central1-a',
  // supports any authentication approach
  // documented here:
  // https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  // in my case I'm using the credentials populated by
  // oauth login with gcloud bin.
  credentials: require('./credentials.json')
})
const uuid = require('uuid')

// could optionally initialize cluster
// with the name of an existing cluster.
const cluster = gce.cluster(null);

cluster.create('npm-cluster-1', {
  master_auth: {
    username: uuid.v4(),
    password: uuid.v4(),
    client_certificate_config: {
       issue_client_certificate: false
    }
  },
  network: 'my-restricted network',
  initial_node_count: 3,
  node_config: {
    oauth_scopes: [
      'https://www.googleapis.com/auth/compute',
      'https://www.googleapis.com/auth/devstorage.read_only',
    ]
  }
}, (err, resp) => {
  // hooray \o/ we should be booting a new k8 cluster.
  console.log(resp)
})
```
