/*jslint devel: true, undef: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
    
/**
 *  Quicksort
 *
 *  Exports a `quicksort` function that (surprisingly enough) performs
 *  quicksort on a given array.
 *
 *  Implementation based on the discussion in "Introduction to
 *  Algorithms", Section 7.1
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
exports.quicksort   = ( function () {
    var _quicksort, _partition, _exchange, _comparison;

    _quicksort  = function ( a, start, end ) {
        var pivot_index = null;
        if ( start < end ) {
            pivot_index = _partition( a, start, end );
            _quicksort( a, start, pivot_index - 1  );
            _quicksort( a, pivot_index + 1, end  );
        }
    };

    _partition  = function ( a, start, end  ) {
        // Randomize the last item of the array to reduce the risk
        // of `O(n^2)` performance in the worst case.
        _exchange( a, end, Math.floor( Math.random() * ( end - start ) + start ) );
        
        var pivot_value = a[ end ],
            pivot_index = start - 1,
            i           = null;

        for ( i = start; i < end; i += 1 ) {
            if ( _comparison( a[ i ], pivot_value ) < 0 ) {
                pivot_index += 1;
                _exchange( a, pivot_index, i );
            }
        }

        pivot_index += 1;
        _exchange( a, pivot_index, end );

        return pivot_index;
    };

    _exchange   = function ( a, x, y ) {
        var tmp = a[ x ];
        a[ x ]  = a[ y ];
        a[ y ]  = tmp;
    };

    return function( tosort, cmp ) {
        var tmp = tosort.slice();
        if ( !cmp ) {
            cmp = function ( a, b ) { return a - b; };
        }

        // Set the quasi-global comparison function.
        _comparison = cmp;

        _quicksort( tmp, 0, tmp.length - 1, cmp );
        return tmp;
    };
}() );
