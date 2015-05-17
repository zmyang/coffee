module.exports = function(config) {

  // Output directory
  config.dest = 'www';
  
  // Inject cordova script into html
  config.cordova = false;
  
  // Images minification
  config.minify_images = true;

  // Development web server

  config.server.host = 'localhost';
  config.server.port = '8008';
  
  // Set to false to disable it:
  // config.server = false;

  // Weinre Remote debug server
  
  config.weinre.httpPort = 8009;
  config.weinre.boundHost = 'localhost';

  // Set to false to disable it:
  config.weinre = false;
    
  // 3rd party components
  // config.vendor.js.push('.bower_components/lib/dist/lib.js');
  // config.vendor.fonts.push('.bower_components/font/dist/*');
  config.vendor.js.push('./bower_components/angular-carousel/dist/angular-carousel.js');

};