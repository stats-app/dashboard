/**
 * Created by tom on 18/03/15.
 */
describe('ApiUrlServiceTest', function()
{
    "use strict";
    var service;

    //create the api service
    beforeEach( function() {
        var ApiUrlService = require('../application/ApiUrlService.js');
        service = new ApiUrlService();
    } );

    //for now our API url is hardcoded, this test will be updated later
    it( 'should return the right url when the method is called', function()
    {
      expect( service.getApiUrl() ).toEqual( 'http://api.local' );
    } )


} );