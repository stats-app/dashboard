/**
 * Created by tom on 18/03/15.
 */
module.exports = function( $http, apiUrlService )
{
    /**
     * Get a series of metrics
     * @param {Array} metrics
     * @param {Function} callback
     */
    this.getMetricSeries = function( metrics, callback )
    {
        "use strict";
        var url = apiUrlService.getApiUrl() + '/metrics/series';

        var params = {};
        for( var i = 0; i < metrics.length; i++ ) {
            params['series[' + i + ']'] = metrics[i];
        }

        $http( {
            url: url,
            method: "GET",
            params: params
        }).success( function( data ) {
            callback( data );
        } );
    };

    /**
     * Get a list of all metrics
     * @param callback
     */
    this.getMetricList = function( callback )
    {
        "use strict";
        //I kinda want to be independent of Angular's promise API so callback soup ahoy
        $http.get( apiUrlService.getApiUrl() + '/metrics/list' ).success( function( data ) {
            callback( data );
        } );
    }
};
