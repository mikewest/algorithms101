function _generate_all_arrays( set ) {
    var i           = 0,
        j           = 0,
        templates   = [],
        returns     = [];

    if ( set.length === 1 ) {
        return [ set ];
    }
   
    templates = _generate_all_arrays( set.slice(1) );
    for ( i = 0; i < templates.length; i++ ) {
        for ( j = 0; j <= templates[ i ].length; j++ ) {
            returns[ returns.length ] = templates[ i ].slice( 0, j ).concat( set[ 0 ] ).concat( templates[ i ].slice( j ) );
        }
    }
    return returns;
}

exports.permutations = _generate_all_arrays;
