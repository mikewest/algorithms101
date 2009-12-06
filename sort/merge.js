/*jslint devel: true, undef: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
    
/**
 *  Merge Sort
 *
 *  Exports a `mergesort` function that (surprisingly enough) performs
 *  a merge sort on a given array.
 *
 *  Implementation based on the discussion in "Introduction to
 *  Algorithms", Section 2.3
 *
 *  @param  {Array}     tosort  The array to be sorted.
 *  @param  {Function}  cmp     The comparison function to be used, which ought
 *                              return a negative number if `a` is less than `b`,
 *                              zero if they are equal, and a positive number if
 *                              `a` is greater than `b`.  If no function is
 *                              provided, a default function will be used that
 *                              _only_ works correctly for integers and floats.
 *                              BEWARE!
 *
 *  @returns    {Array}         A copy of `tosort`, sorted.
 */
exports.mergesort   = ( function () {
    var _mergesort, _merge, _comparison, _SENTINEL;

    _SENTINEL   = null;

    _mergesort  = function ( a, start, end ) {
        var pivot = Math.floor( ( end + start ) / 2 );
        if ( start < end ) {
            _mergesort( a, start, pivot );
            _mergesort( a, pivot + 1, end );
            _merge( a, start, pivot, end );
        }
        return a;
    };

    _merge      = function ( a, start, pivot, end, indent ) {
        var left        = a.slice( start, pivot + 1 ),
            right       = a.slice( pivot + 1, end + 1 ),
            left_index  = 0,
            right_index = 0,
            i           = 0,
            tmp         = null;

        left[ left.length ]     =   _SENTINEL;
        right[ right.length ]   =   _SENTINEL;

        for ( i = start; i <= end; i += 1 ) {
            tmp = _comparison( left[ left_index ], right[ right_index ] );

            if ( tmp >= 0 && right[ right_index ] !== _SENTINEL ) {
                a[ i ]      =   right[ right_index ];    
                right_index +=  1;
            } else if ( left[ left_index ] !== _SENTINEL ) {
                a[ i ]      =   left[ left_index ];
                left_index  +=  1;
            }
        }
    };

    return function( tosort, cmp ) {
        var tmp = tosort.slice();
        if ( !cmp ) {
            cmp = function ( a, b ) { return a - b; };
        }
        
        // Set the quasi-global comparison function.
        _comparison = cmp;

        _mergesort( tmp, 0, tmp.length - 1, '' );
        return tmp;
    };
}() );

if ( require.main === module.id ) {
    print( exports.mergesort( [ 9, 2, 1, 3, 6, 4, 8, 7, 5, 0 ] ) );
}
