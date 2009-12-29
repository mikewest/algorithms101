exports.testMergeO_n2            = require( "./merge_arrays_n2" );

if ( require.main === module.id ) {
    require( "os" ).exit( require( "test/runner" ).run( exports ) );
}
