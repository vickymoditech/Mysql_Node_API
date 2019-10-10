/*eslint no-process-env:0*/

// Set default node environment to development
// Change Environment production / development
var env = process.env.NODE_ENV = 'development';

if(env === 'development' || env === 'test' || env === 'production') {
    // Register the Babel require hook
    require('babel-register');
}

// Export the application
exports = module.exports = require('./app');
