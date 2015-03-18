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
            }
        };

        graphCreator = {
            createGraph: function( arg ) {
                return 'creategraph called with ' + arg;
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

    it( 'should set $scope.chartObject to what is returned from the chartCreator when updateChart is called', function() {
        $scope.updateChart('cats'); //this is invalid chart data but the controller doesn't care
        expect( $scope.chartObject).toBe( 'creategraph called with cats' );
    } );
} );