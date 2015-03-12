/**
 * 
 */
module.exports = function(grunt) {
	grunt.initConfig({
		compress : {
			main : {
				options : {
					archive : 'bin/DataTableComponent.zip'
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
				}
			}
		},
		cssmin : {
			target : {
				files : [ {
					expand : true,
					cwd : 'src',
					src : [ '*.css' ],
					dest : 'dist',
					ext : '.css'
				} ]
			}
		},
		copy : {
			main : {
				files : [ {
					cwd : 'src',
					expand : true,
					src : [ 'component.xml' ],
					dest : 'dist',
					filter : 'isFile'
				} ]
			}
		},
		command : {
			run_bat: {
				type: 'bat',
				cmd: 'bin/biserver-ce/import-export.bat'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-commands');
	grunt.registerTask('default', [ 'uglify', 'cssmin', 'copy', 'compress' ]);
	grunt.registerTask('publish-refresh', [ 'default', 'command' ]);
};