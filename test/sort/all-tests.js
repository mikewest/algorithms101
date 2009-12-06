exports.testInsertionSort   = require( "./insertion" );
exports.testQuicksort   = require( "./quick" );

if ( require.main === module.id ) {
    require( "os" ).exit( require( "test/runner" ).run( exports ) );
}
