# Getting Started - Architecture

So far, the application has relied on a single module, but as the application continues to grow, we should consider breaking our application into multiple [NgModules](/guide/architecture-modules).

Every component, directive, and pipe of our application belongs to exactly one NgModule, and the context of these objects is set by the NgModule they belong to.

When you refer to another component from within your template, that component must belong to the same NgModule, or be imported at the NgModule level.

At runtime, our application is a tree of components, but each component could come from a different module. The structure of our component tree is different than the structure of our modules.

<figure>
  <img src='generated/images/guide/toh/component-hierarchy.svg' alt="Components can be nested and belong to different modules">
</figure>

## Libraries

It is very common to create a component library as a module or set of modules that can be imported by other teams. A great example of this is Angular Material which has [a module for each visual component](https://material.angular.io/components/categories) you may want to add to an application.

You have the same ability to create and publish libraries that can be imported by other teams. Read more about using, creating, and publish libraries in the libraries guide.

## Lazy Loading

Lazy loading is a common and recommended strategy in Angular where you take your application and split it into modules using the router. You define these modules in such a way that Angular only loads the code for a given module when the router has identified that user is attempting to access the route that requires it.

Following this strategy makes your application smaller to load initially, and improves the experience of your users.

## Tasks

### Lazy Load Product Details

To get started with Lazy Loading, start in your route configuration at the top of your application and add a reference to a module, instead of a component.

1. Right click on the app folder and generate an NgModule named products.
1. Import `ReactiveFormsModule` from the `@angular/forms` package.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="reactive-forms-module">
</code-example>

1. Add `ReactiveFormsModule` to the `imports` array of the ProductsModule.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="reactive-module-imports">
</code-example>

Import `ProductDetailsComponent` and `CheckoutFormComponent`.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="components">
</code-example>

Add `ProductDetailsComponent` and `CheckoutFormComponent` add it them to the `declarations` array of the `ProductsModule`.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="declarations">
</code-example>

1. Import `RouterModule` from the `@angular/router` package.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="router-module">
</code-example>

Add the `RouterModule.forChild()` method to the `imports` array of the `ProductsModule` and and a variable route for the product details. 
Set the route path to `:productId`, and the component to `ProductDetailsComponent`.

<code-example header="src/app/products/products.module.ts" path="getting-started/src/app/products/products.module.ts" linenums="false" region="router-module-imports">
</code-example>

Update the path from `products/:productId` to `products`, use the `loadChildren` property with path to `products.module` and the `ProductModule` symbol, and remove all references to `ProductDetailsComponent` and `CheckoutFormComponent`.

<code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts">
</code-example>

The string provided in `loadChildren` references the path of our module's TypeScript file, and then after the `#` sign, references the symbol that contains our module.

When the user navigates to `products/42`, the router automatically load an execute the code for the Lazy Loaded Products Module.

As the router descends the tree, it consumes the matched segements of the route. This means our `:productId` route in the child module matches `/products/42` in the URL bar because `products` was consumed by the parent module.

## Summary

The application now has a very basic landing page, pull data from the internet, and lazily loads Angular code as the user moves around the application.

The next step is to [deploy our application](/tutorial/getting-started-deployment).
