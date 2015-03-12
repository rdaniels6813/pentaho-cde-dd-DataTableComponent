/**
 * 
 */
module.exports = function(grunt) {
	grunt.initConfig({
		compress : {
			main : {
				options : {
					archive : './bin/DataTableComponent.zip'
				},
				files : [ {
					expand : true,
					cwd : 'dist',
					src : [ '**/*' ],
					dest : 'DataTableComponent/'
				} ]
			}
		},
		uglify : {
			main : {
				files : {
					'dist/component.js' : [ 'src/component.js' ],
					'dist/component.css' : [ 'src/component.css' ],
					'dist/component.xml' : [ 'src/component.xml' ]
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', [ 'uglify', 'compress' ]);
};