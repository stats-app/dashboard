/**
 * Created by tom on 18/03/15.
 */
var ApiUrlService = require('./ApiUrlService.js');
var MetricService = require('./MetricService.js');
var GraphController = require('./GraphController.js');
var GraphCreator = require('./ChartCreator.js');

// create a module for our graph app
var graphApp = angular.module( 'graphApp', ['googlechart'] );

//wire up services
graphApp.service('apiUrlService', function() {
    return new ApiUrlService();
} );

graphApp.service('createGraphService', function() {
    return new GraphCreator();
} );

graphApp.service( 'metricService', ['$http', 'apiUrlService', function( $http, apiUrlService ) {
    return new MetricService( $http, apiUrlService );
}] );

//wire up controllers
graphApp.controller( 'graphController', ['$scope', 'metricService', 'createGraphService', GraphController] );