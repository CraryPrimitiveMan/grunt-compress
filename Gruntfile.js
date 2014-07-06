module.exports = function(grunt) {

    var mozjpeg = require('imagemin-mozjpeg');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: '**/*.js',
                    dest: 'build/js'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                cwd: 'src/css/',
                src: '*.css', //src: ['*.css', '!*.min.css'],
                dest: 'build/css/'
            }
        },
        htmlmin: {
            dynamic: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'build'
                }]
            }
        },
        imagemin: {
            dynamic: { // Another target
                options: { // Target options
                    optimizationLevel: 7,
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}'], // Actual patterns to match
                    dest: 'build/images' // Destination path prefix
                }]
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin', 'imagemin']);
};
