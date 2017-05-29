# Word Search Game


A ligh Weight word serch game 

# Getting started

Open a command prompt (terminal) and type in the following:

    ```sh
    cd C:\js\node\apps
    git clone https://github.com/RoshanDaruka/wordSearch.git 
    cd hello-world
    npm install
    npm start
    ```
   
Then open your [http://localhost:8010/](http://localhost:8010/) to play game.

# Game Specification

* Number of players (2 -5);
* Gird Size 15*15
* Pass turn option
* Pause Play option due to persistant state


# Project Included


* a proper file/folder structure
* bootstrap react components
* sass
* hot loader for ease of development
* redux tools
* js and css bundle files built for development or production

# Installed packages

Here are the npm packages that App installs:

|Feature|Packages|Benefits|
|-------|--------|--------|
|React|[`react`](https://github.com/facebook/react)|A declarative, efficient, and flexible JavaScript library for building user interfaces|
||[`react-dom`](https://www.npmjs.com/package/react-dom)|Serves as the entry point of the DOM-related rendering paths|
||[`react-hot-loader`](https://github.com/gaearon/react-hot-loader)|Tweak React components in real time when developing|
|Redux|[`redux`](https://github.com/reactjs/redux)|A predictable state container for JavaScript apps|
||[`react-redux`](https://github.com/reactjs/react-redux)|React bindings for Redux|
||[`redux-freeze`](https://github.com/buunguyen/redux-freeze)|Redux middleware that prevents state from being mutated anywhere in the app|
|Router|[`react-router`](https://github.com/ReactTraining/react-router)|Declarative routing for React. Your app has pages now|
||[`react-router-redux`](https://github.com/reactjs/react-router-redux)|Simple bindings to keep react-router and redux in sync|
|Bootstrap|[`react-bootstrap`](https://github.com/react-bootstrap/react-bootstrap)|Bootstrap 3 components built with React|
||[`react-router-bootstrap`](https://github.com/react-bootstrap/react-router-bootstrap)|Integration between React Router and React-Bootstrap|
|Asynchronous|[`redux-saga`](https://github.com/yelouafi/redux-saga)|Asynchronous API calls made easy with Saga|
|Unit tests|[`mocha`](https://github.com/mochajs/mocha)|Simple javascript test framework|
||[`enzyme`](https://github.com/airbnb/enzyme)|JavaScript Testing utilities for React components|
||[`react-addons-test-utils`](https://facebook.github.io/react/docs/test-utils.html)|Required by enzyme. Makes it easy to test React components|
||[`ignore-styles`](https://www.npmjs.com/package/ignore-styles)|Ignore imported style files when running in Node|
|Sass|[`node-sass`](https://github.com/sass/node-sass)|Mature, stable, and powerful CSS extension language|
|Webpack|[`webpack`](https://github.com/webpack/webpack)|A bundler for javascript, css and others|
||[`webpack-dev-server`](https://github.com/webpack/webpack-dev-server)|Serves the app at [http://localhost:8010/](http://localhost:8010/)|
||[`extract-text-webpack-plugin`](https://github.com/webpack/extract-text-webpack-plugin)|Webpack plugin that builds the css bundle file|
||[`style-loader`](https://github.com/webpack/style-loader)|Webpack module that loads styles|
||[`css-loader`](https://github.com/webpack/css-loader)|Webpack module that loads css styles|
||[`sass-loader`](https://github.com/jtangelder/sass-loader)|Webpack module that loads sass styles|
||[`clean-webpack-plugin`](https://github.com/johnagan/clean-webpack-plugin)|Webpack module to remove previous build files|
|Babel|[`babel-core`](https://github.com/babel/babel/tree/master/packages/babel-core)|Compiler that helps node.js and the browser to understand the new js syntax|
||[`babel-runtime`](https://www.npmjs.com/package/babel-runtime)|Helps node.js to understand the new js syntax|
||[`babel-preset-es2015`](http://babeljs.io/docs/plugins/preset-es2015/)|Helps node.js to use [ES2015 Javascript syntax](http://www.ecma-international.org/ecma-262/6.0/ECMA-262.pdf)|
||[`babel-preset-react`](http://babeljs.io/docs/plugins/preset-react/)|Helps node.js to use React's [JSX syntax](https://facebook.github.io/jsx/)|
||[`babel-preset-stage-3`](https://babeljs.io/docs/plugins/preset-stage-0/)|Helps node.js to use the spread operator|
||[`babel-loader`](https://github.com/babel/babel-loader)|Helps webpack to compile the new javascript syntax|
||[`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/)|Helps the browser to understand the new js syntax|


# Change host and/or port

If you don't want to use localhost on port 8010, you can change it in `package.json` and `webpack.config.js`.





# Scripts

Besides the `start` script, there are also other scripts

|`npm run <script>`|What it does|
|------------------|------------|
|`start`|Starts the app at [http://localhost:8010/](http://localhost:8010/). The bundle js/css files are stored in memory|
|`test`|Starts the unit testing using all the files found in the `test` folder|
|`test-watch`| Starts the unit testing and watches for changes to re-run the tests|
|`build-dev`|Builds the js/css bundle files in the `public` folder. Adds debugging code for development|
|`build-prod`|Builds the js/css bundle minified files in the `public` folder|

