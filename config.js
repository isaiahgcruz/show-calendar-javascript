const config = {
  dev: {
    mongoUri: 'mongodb://localhost/shows',
    sessionSecret: 'anything',
    appUrl: 'localhost:3000',
    google: {
      clientId: '531939707305-tbvaemibt7lqm246tn9gmoaboqd32787.apps.googleusercontent.com',
      clientSecret: 'rxqcJo1EnAK_yvtsLJ131mSR',
    },
  },
  prod: {
    mongoUri: 'mongodb://localhost/shows',
    sessionSecret: 'anything',
    appUrl: 'localhost:3000',
    google: {
      clientId: '531939707305-tbvaemibt7lqm246tn9gmoaboqd32787.apps.googleusercontent.com',
      clientSecret: 'rxqcJo1EnAK_yvtsLJ131mSR',
    },
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.prod;
} else {
  module.exports = config.dev;
}