/**
 * Really awful JQuery lies within
 */
(function() {

    /**
     * Create a chart
     * @param {Array} series A list of metrics to graph
     * @param {String} div The div element in which to place the graph
     */
    var createChart = function(series, div)
    {
        $.getJSON( 'http://api.local/metrics/series', {series: series},  function( response ) {

            var numElements = Infinity;
            var chartData = [["Time"]];

            for( series in response ) {
                if ( response.hasOwnProperty( series ) ) {
                    numElements = Math.min( numElements, response[series].values.length );
                    chartData[0].push( response[series].name );
                }
            }


            for( var i = 0; i < numElements; i++ ) {
                var currentColumn = [i];
                for( series in response ) {
                    if ( response.hasOwnProperty( series ) ) {
                        currentColumn.push( response[series].values[i] );
                    }
                }
                chartData.push( currentColumn );
            }

            console.log(chartData);
            var data = google.visualization.arrayToDataTable( chartData );
            var chart = new google.visualization.AreaChart( document.getElementById( div ) );
            chart.draw(data, {});
        } );
    };

    /**
     * Called when the google visualisation library loads
     * this controls setting up the UI to display charts
     */
    var app = function()
    {
        createChart(['system.net.bytes_sent'], 'chart1');
        createChart(['system.net.bytes_rcvd'], 'chart2');
    };

    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback( app );
})();


