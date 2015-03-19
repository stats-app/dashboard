/**
 * Created by tom on 3/19/15.
 * This is a tiny little hacky directive to call ng-update every X seconds
 */
module.exports = function() {
    return {
        scope: true,
        restrict: 'A',
        link: function(scope, iElement, attrs) {
            setInterval( function() {
                scope.$apply( attrs.ngChange );
            }, Math.max(1000, attrs.callChangeEvery * 1000 ) );
        }
    };
};