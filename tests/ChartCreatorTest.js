/**
 * Created by tom on 18/03/15.
 */
describe('ChartCreatorTest', function()
{
    "use strict";
    var service;

    var testData = [{"name":"cpuWait","values":{1426795772: 0,1426795773: 0,1426795774: 0,1426795775: 2.22,1426795776: 1.37,1426795777: 1}},
                    {"name":"memPhysFree","values":{1426795772: 0,1426795773: 0,1426795774: 0,1426795775: 2.22,1426795776: 1.37,1426795777: 1}}];

    beforeEach( function() {
        var ChartCreator = require('../application/ChartCreator.js');
        service = new ChartCreator();
    } );

    it ( 'should have a type of AreaChart coz its the prettiest', function() {
        expect( service.getChartObject( testData ).type ).toBe( 'AreaChart' );
    } );

    it( 'should create three columns - timestamp, and one column per metric', function()
    {
        var columns = service.getChartObject( testData ).data.cols;

        expect( columns.length ).toBe( 3 );
        expect( columns[0].label ).toBe( 'Timestamp' );
        expect( columns[0].type ).toBe( 'datetime' );
        expect( columns[1].label ).toBe( 'cpuWait' );
        expect( columns[1].type ).toBe( 'number' );
        expect( columns[2].label ).toBe( 'memPhysFree' );
        expect( columns[2].type ).toBe( 'number' );
    } );

    it( 'should create as many rows as there are metrics', function() {
        var rows = service.getChartObject( testData ).data.rows;
        expect( rows.length ).toEqual( Object.keys(testData[0].values).length );
    } );

    it ( 'should ensure every row has the bizarre c property which contains the actual data', function() {
        var rows = service.getChartObject( testData ).data.rows;
        for ( var i = 0; i < rows.length; i++ ) {
            expect( rows[i].hasOwnProperty('c') ).toBeTruthy();
            expect( rows[i].c.length ).toEqual( 3 );
        }
    } );

    it( 'should ensure each item in c contains an object where v is the metric value', function() {

        var rows = service.getChartObject( testData ).data.rows;
        var timestamps = Object.keys( testData[0].values );
        timestamps.sort();

        for ( var i = 0; i < timestamps.length; i++ ) {

            //timestamp is just set the row #
            expect( rows[i].c[0].v).toEqual( new Date(timestamps[i] * 1000) );

            //but all the other columns should be metrics
            for ( var c = 1; c < rows[i].c.length; c++ ) {
                expect( rows[i].c[c].v).toEqual( testData[c-1].values[timestamps[i]] );
            }
        }
    } );

    it( 'should set the title to the names of the metrics used', function() {
        var title = service.getChartObject( testData ).options.title;
        expect( title ).toBe( 'cpuWait,memPhysFree' );
    } );

    it( 'should return an empty object when invalid data is passed', function() {
        var ret = service.getChartObject([]);
        expect( ret ).toEqual( {} );
    } );
} );