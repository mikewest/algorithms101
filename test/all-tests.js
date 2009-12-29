exports.testMerge   = require( "./merge/all-tests" );
exports.testSort    = require( "./sort/all-tests" );

if ( require.main === module.id ) {
    require("os").exit(require("test/runner").run(exports));
}
