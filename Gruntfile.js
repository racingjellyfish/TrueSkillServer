module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean : ['dist'],
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['lib/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		connect: {
			uses_defaults: {}
		},
		jshint: {
			files: ['gruntfile.js', 'lib/**/*.js', 'routes/**/*.js', 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				ignores: ['test/libs/**'],
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					require: 'test/libs/blanket'
				},
				src: ['test/**/*Mocha.js']
			},
			coverage: {
				options: {
					reporter: 'html-cov',
					// use the quiet flag to suppress the mocha console output
					quiet: true,
					// specify a destination file to capture the mocha
					// output (the quiet option does not suppress this)
					captureFile: 'coverage.html'
				},
				src: ['test/**/*Mocha.js']
			}
		},
		qunit: {
			options: {
				urls:	['http://localhost:8000/test/ui/index.html'],
				timeout: 10000,
				'--cookies-file': 'test/ui/misc/cookies.txt'
			},
			all: ['test/ui/**/*.html']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default', ['jshint', 'nodeunit', 'connect', 'qunit',
		'clean', 'concat', 'uglify']);

	grunt.registerTask('test-server', ['jshint', 'nodeunit']);

	grunt.registerTask('test-ui', ['jshint', 'connect', 'qunit']);

	grunt.event.on('qunit.spawn', function (url) {
		grunt.log.ok("\nRunning ui test: " + url);
	});
};
