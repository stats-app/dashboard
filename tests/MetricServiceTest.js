/**
 * Created by tom on 18/03/15.
 */
describe('MetricServiceTest', function() {

    "use strict";
    var $httpBackend;

    var apiUrlService;

    var metricService;

    beforeEach( inject( function( $injector ) {
        $httpBackend = $injector.get( '$httpBackend' );
        $http = $injector.get( '$http' );


        $httpBackend.when( 'GET', 'http://mock.local/metrics/series' )
                    .respond( {userId: 'userX'}, {'A-Token': 'xxx'} );


        $httpBackend.when( 'GET', 'http://mock.local/metrics/list' )
                    .respond( ['testMetric', 'testMetric2'] );

        apiUrlService = {
            getApiUrl: function() {
                return 'http://mock.local'
            }
        };

        var MetricService = require('../application/MetricService.js');
        metricService = new MetricService( $http, apiUrlService );
    } ) );

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    it( 'should get the metric list from the api and pass it through', function() {
        $httpBackend.expectGET('http://mock.local/metrics/list');
        metricService.getMetricList( function( metrics ){
            expect( metrics[0] ).toBe( 'testMetric' );
            expect( metrics[1] ).toBe( 'testMetric2' );
        } );
        $httpBackend.flush();
    } );

    it('should get the metric series from the api', function() {
        $httpBackend.expectGET('http://mock.local/metrics/series');
        metricService.getMetricSeries( [], function( metrics ){
            expect(metrics).toBeTruthy(); //not worrying about the format yet
        } );
        $httpBackend.flush();
    } );
});