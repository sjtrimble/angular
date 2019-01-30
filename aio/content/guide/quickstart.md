# Getting Started with Angular

Welcome to Angular! Angular helps you build modern applications for the web, mobile, or desktop.

This guide shows you how to build and run a simple Angular app. You'll use the Angular CLI tool to accelerate development, while adhering to the Style Guide recommendations that benefit every Angular project.

This guide takes less than 30 minutes to complete. At the end of this guide—as part of final code review—there is a link to download a copy of the final application code. (If you don't execute the commands in this guide, you can still download the final application code.)


{@a devenv}
{@a prerequisites}
## Prerequisites 

Before you begin, make sure your development environment includes Node.js® and an npm package manager.


{@a nodejs}
### Node.js

Angular requires `Node.js` version 8.x or 10.x.

* To check your version, run `node -v` in a terminal/console window.

* To get `Node.js`, go to [nodejs.org](https://nodejs.org "Nodejs.org").

Compatible versions are listed in the "engines" section of the [master `package.json` file](https://github.com/angular/angular/blob/master/package.json) for Angular.


{@a npm}
### npm package manager: npm or yarn

Angular, the Angular CLI, and Angular apps depend on features and functionality provided by libraries that are available as [npm packages](https://docs.npmjs.com/getting-started/what-is-npm). To download and install npm packages, you must have an npm package manager. 

The following package managers have been verified with Angular: 

* The [npm client](https://docs.npmjs.com/cli/install) command line interface, which is installed with `Node.js` by default. To check if you have the npm client installed, run `npm -v` in a terminal/console window. Most of the documentation for Angular assumes the `npm` client. 

* The [yarn client](https://yarnpkg.com/). Compatible versions are listed in the "engines" section of the [master `package.json` file](https://github.com/angular/angular/blob/master/package.json) for Angular.


{@a install-cli}

## Step 1: Install the Angular CLI

You use the Angular CLI 
to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

Install the Angular CLI globally. 

To install the CLI using `npm`, open a terminal/console window and enter the following command:


<code-example language="sh" class="code-shell">
  npm install -g @angular/cli

</code-example>



{@a create-proj}

## Step 2: Create a workspace and initial application

You develop apps in the context of an Angular [**workspace**](guide/glossary#workspace). A workspace contains the files for one or more [**projects**](guide/glossary/#project). A project is the set of files that comprise an app, a library, or end-to-end (e2e) tests. 

To create a new workspace and initial app project: 

1. Run the CLI command `ng new` and provide the name `my-app`, as shown here: 

    <code-example language="sh" class="code-shell">
      ng new my-app

    </code-example>

2. The `ng new` command prompts you for information about features to include in the initial app project. Accept the defaults by pressing the Enter or Return key. 

The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes. 

It also creates the following workspace and starter project files: 

* A new workspace, with a root folder named `my-app`
* An initial skeleton app project, also called `my-app` (in the `src` subfolder)
* An end-to-end test project (in the `e2e` subfolder)
* Related configuration files

The initial app project contains a simple Welcome app, ready to run. 

{@a serve}

## Step 3: Serve the application

Angular includes a server, so that you can easily build and serve your app locally.

1. Go to the workspace folder (`my-app`).

1. Launch the server by using the CLI command `ng serve`, with the `--open` option.

<code-example language="sh" class="code-shell">
  cd my-app
  ng serve --open
</code-example>

The `ng serve` command launches the server, watches your files,
and rebuilds the app as you make changes to those files.

The `--open` (or just `-o`) option automatically opens your browser
to `http://localhost:4200/`.

Your app greets you with a message:


<figure>
  <img src='generated/images/guide/cli-quickstart/app-works.png' alt="Welcome to my-app!">
</figure>

