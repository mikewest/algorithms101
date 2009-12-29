/*jslint devel: true, undef: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
/**
 *  Merge Sorted Arrays
 *
 *  Exports a `merge_arrays` function that, given an arbitrary number
 *  of sorted arrays, produces a new array containing all of the given
 *  arrays' elements, in sorted order.
 *
 *  @param  {Array}     tosort  An array of arrays to be sorted.
 *  @param  {Function}  cmp     The comparison function to be used, which ought
 *                              return a negative number if `a` is less than `b`,
 *                              zero if they are equal, and a positive number if
 *                              `a` is greater than `b`.  If no function is
 *                              provided, a default function will be used that
 *                              _only_ works correctly for integers and floats.
 *                              BEWARE!
 *
 *  @returns    {Array}         An array containing all the elements of all `tosort`'s
 *                              arrays, sorted.
 */
exports.merge_arrays    = ( function () {
    var _comparison = function( a, b ) { return a - b; };

    /**
     *  Determine index of array starting with the smallest item
     *
     *  @param      {Array} arrays  The array of arrays to examine
     *  @returns    {Int}           The index of the array that contains the
     *                              smallest item, or `null` if all the arrays
     *                              are empty.   
     */
    function determine_minimum( arrays ) {
        var min         = null,
            min_index   = null,
            i;

        for ( i = 0; i < arrays.length; i += 1 ) {
            if ( typeof arrays[ i ][ 0 ] !== "undefined" ) {
                if (
                    min_index === null ||
                    _comparison( arrays[ i ][ 0 ], min ) < 0
                ) {
                    min         = arrays[ i ][ 0 ];
                    min_index   = i;
                }
            }
        }

        return min_index;
    }

    function merge_arrays( arrays ) {
        var finished    = false,
            tmp         = [],
            min_index   = -1;

        while ( !finished ) {
            min_index = determine_minimum( arrays );
            if ( min_index === null ) {
                finished = true;
            } else {
                // Pull it out of the relevant array, and stick it onto the end of `tmp`
                tmp[ tmp.length ] = arrays[ min_index ].shift();
            }
        }

        return tmp;
    }

    return function( tosort, cmp ) {
        // Set the "global" comparison function, if provided
        if ( cmp ) {
            _comparison = cmp;
        }

        return merge_arrays( tosort );
    };
}() );

if ( require.main === module.id ) {
    print( exports.merge_arrays( [ [ 1 ], [ 0 ], [ 3 ], [ 2 ] ] ) );
    print( exports.merge_arrays( [ [ 1, 2, 3, 4, 5, 90 ], [ 0, 1, 2, 3, 4, 5, 900 ], [ 3, 4, 5, 6, 7, 8, 9000 ], [ 2, 3, 4, 5, 6, 90000 ] ] ) );
}
