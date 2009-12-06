/*jslint devel: true, undef: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
    
/**
 *  Insertion Sort
 *
 *  Exports a `insertionsort` function that (surprisingly enough) performs
 *  an insertion sort on a given array.
 *
 *  Implementation based on the discussion in "Introduction to
 *  Algorithms", Section 2.1
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
exports.insertionsort = ( function() {
    var _insertionsort, _exchange;

    _insertionsort  = function ( a, cmp ) {
        var sorted_partition, key, current_index;
        for ( sorted_partition = 1; sorted_partition < a.length; sorted_partition += 1 ) {
            current_index   = sorted_partition;
            key             = a[ sorted_partition ];
            while ( current_index && cmp( key, a[ current_index - 1 ] ) < 0 ) {
                _exchange( a, current_index, current_index - 1 );
                current_index -= 1;
            }
        }
        return a;
    };
    
    _exchange       = function ( a, x, y ) {
        var tmp = a[ x ];
        a[ x ]  = a[ y ];
        a[ y ]  = tmp;
    };

    return function ( tosort, cmp ) {
        var tmp = tosort.slice();
        if ( !cmp ) {
            cmp = function ( a, b ) { return a - b; };
        }
        return _insertionsort( tmp, cmp );
    };
}() );
