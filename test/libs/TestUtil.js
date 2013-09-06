/*
 * Helper functions for tests.
 */
exports.ERROR_TOLERANCE_LARGE = 0.085;
exports.ERROR_TOLERANCE_SMALL = 0.0005;

var _equalsWithTolerance = function(test, actual, expected, tolerance, message) {
	if (Math.abs(actual - expected) <= tolerance) {
		test.ok(true, message);
	} else {
		test.fail(actual, expected, message, 'not within tolerance of',
			this.equalsWithTolerance);
	}
};

exports.equalsWithTolerance = _equalsWithTolerance;
