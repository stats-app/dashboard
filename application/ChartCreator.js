/**
 * Created by tom on 18/03/15.
 */
module.exports = function()
{
    "use strict";

    this.getChartObject = function( testData )
    {
        var toReturn =
        {
            data: {
                cols: [{'id': 'Timestamp', 'label': 'Timestamp', type: 'number'}],
                //cols: [],
                rows: []
            },
            type: 'AreaChart' //the best chart tbh
        };

        //create columns
        for( var i = 0; i < testData.length; i++ ) {
            toReturn.data.cols.push( {
                'id': testData[i].name,
                'label': testData[i].name,
                'type': 'number'
            } );
        }

        //create rows for each metric
        for( i = 0; i < testData[0].values.length; i++ ) {
            var column = [{v: i}]; //make up a timestamp value for now
            //var column = []; //make up a timestamp value for now
            for ( var metric = 0; metric < testData.length; metric++ ) {
                column.push( {v: testData[metric].values[i]} );
            }
            toReturn.data.rows.push( {c: column} );
        }

        return toReturn;
    }
};