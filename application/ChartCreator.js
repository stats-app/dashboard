/**
 * Created by tom on 18/03/15.
 */
module.exports = function()
{
    "use strict";

    this.getChartObject = function( testData )
    {
        if( typeof testData.length == 'undefined' || !testData.length || typeof testData[0].values == 'undefined' ) {
            return {}
        }

        var metricNames = [];
        var toReturn =
        {
            data: {
                cols: [{'id': 'Timestamp', 'label': 'Timestamp', type: 'datetime'}],
                //cols: [],
                rows: []
            },
            type: 'AreaChart' //the best chart tbh
        };

        //create columns
        for( var i = 0; i < testData.length; i++ ) {
            metricNames.push( testData[i].name );
            toReturn.data.cols.push( {
                'id': testData[i].name,
                'label': testData[i].name,
                'type': 'number'
            } );
        }

        var timestamps = Object.keys( testData[0].values );
        timestamps.sort();

        //create rows for each metric
        for( i = 0; i < timestamps.length; i++ ) {

            var timestamp = timestamps[i];
            var column = [{v: new Date(timestamp * 1000)}];

            for ( var metric = 0; metric < testData.length; metric++ ) {
                column.push( {v: testData[metric].values[timestamp]} );
            }

            toReturn.data.rows.push( {c: column} );
        }

        toReturn.options = {title: metricNames.toString(), height: 350};
        return toReturn;
    }
};