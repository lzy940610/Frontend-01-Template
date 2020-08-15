var Generator = require('yeoman-generator')

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
    }
    collecting() {
        this.log('collecting');

    }
    creating() {
        /**
         * 文件系统操作部分
         * 1、创建package.json
         * 2、创建lib目录以及相关依赖
         * 3、创建src事例源码目录
         * 4、安装相关依赖
         */
        // 创建packafe.json文件 （文件系统）
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), {
                title: 'Templating with yeoman'
            } // user answer `title` used
        );

        // 创建lib 相关模块
        this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('lib/createElement.js')
        );
        this.fs.copyTpl(
            this.templatePath('gesture.js'),
            this.destinationPath('lib/gesture.js')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html')
        );
        this.fs.copyTpl(
            this.templatePath('main.test.js'),
            this.destinationPath('test/main.test.js')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        );

        // 安装依赖
        // https://webpack.js.org/api/node/#compiler-instance 直接使用webpack
        this.npmInstall([
            'webpack',
            'webpack-cli',
            'webpack-dev-server',
            'html-webpack-plugin',
            'babel-loader',
            'babel-plugin-istanbul',
            '@babel/register',
            '@babel/core', 
            '@babel/preset-env',
            '@babel/plugin-transform-react-jsx',
            'mocha',
            'nyc',
            '@istanbuljs/nyc-config-babel'
        ], { 'save-dev': true });
        // 创建
        /*
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'), {
                title: 'Templates with yeoman'
            } // user answer `title` used
        );
        */
    }
}