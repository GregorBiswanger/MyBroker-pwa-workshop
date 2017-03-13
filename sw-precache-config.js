module.exports = {
    staticFileGlobs: [
        './css/**.css',
        './**.html',
        './js/**.js',
        './node_modules/materialize-css/dist/css/materialize.min.css',
        './node_modules/materialize-css/dist/fonts/roboto/*',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/materialize-css/dist/js/materialize.min.js',
        './node_modules/pouchdb/dist/pouchdb.min.js'
    ],
    "importScripts": [
           "node_modules/sw-toolbox/sw-toolbox.js",
            "js/toolbox-script.js"
    ]
};