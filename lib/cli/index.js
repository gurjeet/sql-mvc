// Parse commands from '' binary
// There will be other commands in the future

exports.process = function(program) {
  switch (program.args[0]) {

    // Create a new project
    case 'new':
    case 'n':
      return require('./generate').generate(program);
    case 'patch':
    case 'p':
      return require('./generate').patch(program);      
    case 'patchhost':
    case 'ph':
      return require('./generate').patchhost(program);            
    default:
      return console.log('Type "sql-mvc new <projectname>" to create a new application');
  }
};
