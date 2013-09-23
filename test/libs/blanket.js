require('blanket')({
  // Only files that match the pattern will be instrumented
  'pattern': ['lib'],
  // exclude the following directories from instrumentation
  'data-cover-never': ['node_modules', 'test']
});
