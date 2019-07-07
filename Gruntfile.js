module.exports = function (grunt) {
    // Project configuration.
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
      default : {
        tsconfig: './tsconfig.json'
      }
        },
          watch: {
            src: {
                files: ['src/**/*.ts', 'src/*.ts'],
                tasks: ['ts'],
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: [],
            },
          },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-eslint');
    // Default task(s).
    grunt.registerTask('default', ['ts']);

    let changedFiles = Object.create(null);
    const onChange = grunt.util._.debounce(() => {
        const x = {};
        Object.keys(changedFiles).forEach((f) => {
            x[f.replace(/^(\.\/)?src\//, 'lib/')] = f;
        });
        console.log(x);
        grunt.config('babel.watch.files', x);
        changedFiles = Object.create(null);
}, 200);
grunt.event.on('watch', (action, filepath) => {
  changedFiles[filepath] = action;
  onChange();
});
};
