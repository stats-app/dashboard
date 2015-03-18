/**
 * Created by tom on 18/03/15.
 */
describe('GraphControllerTest', function()
{
    "use strict";
    var service;

    var $scope;

    var graphController;

    var graphCreator;

    //create the api service
    beforeEach( function() {

        var mockMetricService = {
            getMetricList: function( cb ) {
                cb( ['cats', 'dogs'] );
            },
            getMetricSeries: function( metrics, cb ) {
                cb( [{name: metrics[0], values: [1,2,3,4]}] );
            }
        };

        graphCreator = {
            getChartObject: function( metrics ) {
                return {metrics: metrics};
            }
        };

        $scope = {};
        var GraphController = require('../application/GraphController.js');
        graphController = new GraphController( $scope, mockMetricService, graphCreator )
    } );

    it( 'should set the scope variable metricList to the list of metrics as soon as it loads', function()
    {
        expect( $scope.metricList[0] ).toBe( 'cats' );
        expect( $scope.metricList[1] ).toBe( 'dogs' );
    } );

    it( 'should set $scope.chartObject to a graph made from metrics from the service', function() {
        $scope.updateChart(['cats']); //this is invalid chart data but the controller doesn't care
        // since the mock graph creator just passes thru metrics we expect it to contain what we expect from the api...
        expect( $scope.chartObject ).toEqual( {metrics: [{name: 'cats', values: [1,2,3,4]}]} );
    } );
} );