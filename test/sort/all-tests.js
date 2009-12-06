exports.testInsertionSort   = require( "./insertion" );
exports.testMergeSort       = require( "./merge" );
exports.testQuicksort       = require( "./quick" );

if ( require.main === module.id ) {
    require( "os" ).exit( require( "test/runner" ).run( exports ) );
}
