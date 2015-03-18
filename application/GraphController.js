/**
 * Created by tom on 18/03/15.
 */
module.exports = function( $scope, graphService, graphCreator )
{
    "use strict";
    $scope.metricList = [];
    $scope.chartObject = {};

    $scope.updateChart = function( metrics ) {
        graphService.getMetricSeries( metrics, function( out ) {
            $scope.chartObject = graphCreator.getChartObject( out );
        } );
    };

    graphService.getMetricList( function( metrics ) {
        $scope.metricList = metrics;
    } );
};