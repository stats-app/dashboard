/**
 * Created by tom on 18/03/15.
 */
module.exports = function( $scope, graphService, graphCreator )
{
    "use strict";
    $scope.metricList = [];
    $scope.chartObject = {};
    $scope.charts = [];

    $scope.addChart = function()
    {
        $scope.charts.push( {chart: {}, metrics: []} );
    };

    $scope.updateChart = function( chart, metrics ) {
        graphService.getMetricSeries( metrics, function( out ) {
            $scope.charts[chart].chart = graphCreator.getChartObject( out );
        } );
    };

    graphService.getMetricList( function( metrics ) {
        $scope.metricList = metrics;
    } );
};