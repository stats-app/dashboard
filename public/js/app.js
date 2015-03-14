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
     * Add a form to each unused chart area,
     * cloned from the template form.
     */
    var createForms = function()
    {
        var templateForm = $('#template-form').remove();
        $.getJSON( 'http://api.local/metrics/list',  function( response ) {

            // append all available metrics to select
            var select = templateForm.find('select');
            for( var i = 0; i < response.length; i++ ) {
                select.append( '<option value="'+response[i]+'">' + response[i] + '</option>' );
            }

            $('.chart').each(function(k, v) {

                var form = templateForm.clone();
                $(v).append( form );

                form.submit( function(e) {

                    e.preventDefault();
                    var data = $(this).serializeArray();
                    var metricsForGraph = [];

                    for( var i in data ) {
                        if ( data.hasOwnProperty(i) ) {
                            metricsForGraph.push(data[i].value);
                        }
                    }

                    var container = $(this).parent().attr('id');
                    createChart(metricsForGraph, container);
                } );
            } );
        });
    };


    /**
     * Called when the google visualisation library loads
     * this controls setting up the UI to display charts
     */
    var app = function()
    {
        createForms();
    };

    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback( app );
})();


