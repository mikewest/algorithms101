var assert  = require( "test/assert" );
var sort    = require( "../../sort/insertion" ).insertionsort;
var perms   = require( "../permutations" ).permutations;

exports.testEmptyArray          =   function() {
    var tmp = [];
    assert.eq( [], sort( tmp ), "Sorting an empty array should return an empty array." );
};

exports.testSingleValueArray    = function() {
    var tmp = [ 1 ];
    assert.eq( [ 1 ], sort( tmp ), "Sorting a one-element array returns an equal array." );
};

exports.testTwoValueArray       = function() {
    var unsorted = [ 2, 1 ],
        sorted   = [ 1, 2 ];
    assert.eq( [ 1, 2 ], sort( unsorted ), "Sorting a two-element, unsorted array returns a sorted array." );
    assert.eq( [ 1, 2 ], sort( sorted ), "Sorting a two-element, sorted array returns a sorted array." );
};

exports.testThreeValueArray     = function() {
    var tests   = perms( [ 1, 2, 3 ] ),
        i       = 0;

    for ( i = 0; i < tests.length; i += 1 ) {
        assert.eq( [ 1, 2, 3 ], sort( tests[ i ] ), "Sorting a three-element list in any order returns a sorted array." );
    }
};

exports.testCmpFunction         = function () {
    var tests   = perms( [ 3, 2, 1 ] ),
        cmp     = function ( a, b ) { return b - a; },
        i       = 0;

    for ( i = 0; i < tests.length; i += 1 ) {
        assert.eq( [ 3, 2, 1 ], sort( tests[ i ], cmp ), "Custom comparison functions ought behave correctly." );
    }
};

exports.testBruteForce          = function () {
    var base    = [],
        tests   = [],
        count   = 0,
        i       = 0;

    for ( count = 0; count < 7; count += 1 ) {
        base[ count ]   = count;
        tests           = perms( base );
        for ( i = 0; i < tests.length; i += 1 ) {
            assert.eq( base, sort( tests[ i ] ), "Bruteforce-generated lists should all sort correctly." );
        }
    }
};

if ( require.main === module.id ) {
    require( "os" ).exit( require( "test/runner" ).run( exports ) );
}
