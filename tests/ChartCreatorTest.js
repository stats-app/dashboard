/**
 * Created by tom on 18/03/15.
 */
describe('ChartCreatorTest', function()
{
    "use strict";
    var service;

    var testData = [{"name":"cpuWait","values":[0,0,0,2.22,1.37,1.54,0,0.34,0.51,0.34,0.51,0.85,0,0.35,0.17,1.02,0.67,0,0,0,0,0.17,0,0,0.86,0.17,0,1.19,0.34,0.17,1.87,0.34,1.19,0.52,0,0,0.51,1.69,1.55,0,0.17,1.36,0.85,0,1.89,0.17,1.04,0.17,0.17,0.68,0,0,0,0,0,0,0.17,0,0,0,0.52,0,0,0,0.85,1.87,0.85,0.17,0,0.18,0,0,1.03,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.34,10.29,4.78,0,0,0.33,0,0.68,8.45,0.34,0.17,0.51,2.07,3.26,0.34,0.51,0.68,0,0,0.85,1.19,1.18,0.85,0.34,0.68,0.67,1.7,0.17,0,0.17,0,1.54,2.36,4.92,0.68,0.68,0.85,1.02,1.19,2.21,0,0.17,0.84]},{"name":"memPhysFree","values":[124,126,133,136,137,138,138,141,146,153,154,175,188,189,194,203,213,216,221,222,227,233,239,270,275,282,288,301,305,313,324,327,334,341,353,370,392,405,429,435,440,448,451,456,461,468,474,478,489,498,501,502,504,506,564,583,583,587,587,587,593,601,604,610,615,622,638,706,709,733,737,738,743,747,754,757,763,763,769,780,786,796,804,832,832,837,850,852,862,866,878,878,881,947,948,955,981,985,986,996,1007,1021,1033,1035,1038,1039,1043,1045,1049,1052,1059,1078,1121,1127,1132,1138,1139,1147,1153,1157,1176,1214,1220,1224,1232,1237,1249,1257,1258,1262,1265,1270,1273,1277,1280,1287,1291,1296,1298,1307,1313,1320,1327,1367,1378,1436,1458,1522,1727,1784,1787,1890,1925,1956,1977,2067,2208,2252,2424,2606,2882,3015,3265,3314,3388,3493,3787,4347,4450,4552,4683,4700,4741,4765,4802,4803,4809,4812,4870,4886,4890,4893,4893,4893,4895,4897,4900,4900,4901,4924,4930,4931,4931,4933,4935,4937,4951,4954,4955,4960,4960,4962,4966,4970,4972,4973,4980,4981,4981,4983,4985,4986,4988,4989,4993,4994,4999,5000,5000,5004,5011,5014,5014,5015,5016,5017,5028,5034,5036,5037,5039,5041,5041,5041,5042,5042,5042,5044,5045,5053,5054,5111,5296,5510,5512,5512,5512,5512,5513,5514,5514,5515,5515,5515,5515,5515,5562,5572,5572,5572,5572,5573,5574,5574,5577,5578,5578,5588,5598,5598,5598,5599,5601,5729,5730,5737,5748,5749,5749,5759,5831,5905,6016,6135,6358,6868]}]

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
        expect( columns[0].type ).toBe( 'number' );
        expect( columns[1].label ).toBe( 'cpuWait' );
        expect( columns[1].type ).toBe( 'number' );
        expect( columns[2].label ).toBe( 'memPhysFree' );
        expect( columns[2].type ).toBe( 'number' );
    } );

    it( 'should create as many rows as there are metrics', function() {
        var rows = service.getChartObject( testData ).data.rows;
        expect( rows.length ).toEqual( testData[0].values.length );
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
        for ( var i = 0; i < rows.length; i++ ) {

            //timestamp is just set the row #
            expect( rows[i].c[0].v).toEqual( i );

            //but all the other columns should be metrics
            for ( var c = 1; c < rows[i].c.length; c++ ) {
                expect( rows[i].c[c].v).toEqual( testData[c-1].values[i] );
            }
        }
    } );

} );