var assert  = require( "test/assert" );
var merge   = require( "../../merge/merge_arrays_n2" ).merge_arrays;

exports.testEmptyArray          =   function() {
    var tmp = [];
    assert.eq( [], merge( tmp ), "Merging an empty array should return an empty array." );
};

exports.testEmptyArrays         =   function() {
    var tmp = [ [], [], [], [] ];
    assert.eq( [], merge( tmp ), "Merging an array of empty arrays should return an empty array." );
};

exports.testSingleValueArray    = function() {
    var tmp = [ [ 1 ] ];
    assert.eq( [ 1 ], merge( tmp ), "Merging one one-element array returns a one-element array." );
};

exports.testSingleValueArrays   = function() {
    var tmp = [ [ 1 ], [ 0 ], [ 3 ], [ 5 ] ];
    assert.eq( [ 0, 1, 3, 5 ], merge( tmp ), "Merging multiple one-element arrays returns a sorted array." );
};

exports.testNegativeNumbers     = function() {
    var tmp = [ [ -1 ], [ 0 ], [ -3 ], [ -5 ] ];
    assert.eq( [ -5, -3, -1, 0 ], merge( tmp ), "Merging arrays containing negative numbers returns a sorted array." );
};

exports.testMultiValueArray    = function() {
    var tmp = [ [ -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 ] ];
    assert.eq( [ -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 ], merge( tmp ), "Merging one array returns a one-element array." );
};

exports.testMultiValueArrays   = function() {
    var tmp = [ [ 1, 3, 5, 7 ], [ 2, 4, 6, 8 ], [ -7, -5, -3, -1 ], [ -8, -6, -4, -2 ] ];
    assert.eq( [ -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 ], merge( tmp ), "Merging multiple arrays returns a sorted array." );
};

exports.testCmpFunction   = function() {
    var tmp = [ [ 1, 3, 5, 7 ].reverse(), [ 2, 4, 6, 8 ].reverse(), [ -7, -5, -3, -1 ].reverse(), [ -8, -6, -4, -2 ].reverse() ],
        cmp = function ( a, b ) { return b - a; };
    assert.eq( [ -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 ].reverse(), merge( tmp, cmp ), "Merging multiple arrays with a new comparison function returns a sorted array." );
};

if ( require.main === module.id ) {
    require( "os" ).exit( require( "test/runner" ).run( exports ) );
}
