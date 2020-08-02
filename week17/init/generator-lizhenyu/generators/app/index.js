var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  /**
   * 
   * 
   * npm
   * file
   */
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag
  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "title",
        message: "Your project title",
      }
    ])
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'), { title: this.answers.title }
    )
  }
}