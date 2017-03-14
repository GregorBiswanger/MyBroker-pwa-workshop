module.exports = {
    staticFileGlobs: [
        './css/**.css',
        './**.html',
        './js/**.js',
        './libs/materialize-css/dist/css/materialize.min.css',
        './libs/materialize-css/dist/fonts/roboto/*',
        './libs/jquery/dist/jquery.min.js',
        './libs/materialize-css/dist/js/materialize.min.js',
        './libs/pouchdb/dist/pouchdb.min.js'
    ],
    importScripts: [
           "libs/sw-toolbox/sw-toolbox.js",
            "js/toolbox-script.js",
            "sw-push-notification.js"
    ]
};