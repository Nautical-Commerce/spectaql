# SpectaQL

[![npm][npm]][npm-url]
[![downloads][npm-downloads]][npm-url]

<img src="/static/SpectaQL.png" width="800">

> A nice enhancement of [DociQL](https://github.com/wayfair/dociql)

SpectaQL is a Node.js library that generates static documentation for a [GraphQL](https://graphql.org) schema using a variety of options:
1. From a live endpoint using the introspection query.
2. From a file containing an introspection query result.
3. From a file containing the schema definition in SDL.

The goal of SpectaQL is to help you keep your documentation complete, current and beautiful with the least amount of pain as possible.

Out of the box, SpectaQL delivers a 3-column page with a modern look and feel. However, many aspects can be customized with ease, and just about everything can be customized if you're willing to dig in.

SpectaQL also has lots of advanced features and ways to enhance your GraphQL documentation.

Anvil uses SpectaQL for our own docs, and you can see them here: [https://www.useanvil.com/docs/api/graphql/reference/](https://www.useanvil.com/docs/api/graphql/reference/)

<img src="/static/anvil-api-screenshot.jpg" width="800">

## Benefits
Using SpectaQL to generate your documentation has a number of benefits, such as:
- Your documentation will always be up-to-date
- Your documentation will always be complete
- Your documentation can be beautiful and "on brand"
- Save developers time and headache by not having to write documentation

## Features

* Various ways to ingest your schema:
  - Hit a live GraphQL endpoint with an introspection query
  - Provide a file containing an introspection query result
  - Provide a file containing your schema in SDL
* Will automatically generate documentation for all Types, Fields, Queries, Mutations and Arguments by default.
* Supports blacklisting entire areas (e.g. "don't show Mutations") and 1-off blacklisting.
* Supports providing examples via static metadata, or dynamically via a custom generator plugin that you control.
* Supports customization of CSS to allow overriding the styles.
* Supports markdown just about everywhere you can provide text.
* Live preview mode while developing.
* Many options for output:
  - Specify a logo
  - Specify a favicon
  - Specify the target directory and HTML file name
  - Can output JS and/or CSS "in line" in your HTML file, rather than as separate files.
  - Can output in "embeddable" mode (only the `<body>` content is generated) so output can be integrated into your existing site.
  - ...and more!


## Getting Started

1. Install SpectaQL:
  
    ```sh
    npm install -g spectaql
    # OR
    yarn global add spectaql
    ```

    This is a global installation, but you can also either:
    + Clone this repository
    + Add `spectaql` as a dependency to an existing project.

2. Define a `config.yml` that specifies how you'd like to generate your docs.
  See [YAML Options](#yaml-options) for more.

3. Generate your docs!
    ```sh
    npx spectaql config.yml
    ```

Your generated documentation will be located in the `public` directory by default. You can either copy the generated HTML to your web server, write the output to somewhere else, or by adding the `-D` flag and viewing your docs live by pointing your browser to [http://localhost:4400/](http://localhost:4400/).

## Examples

The best way to figure out what SpectaQL can do is to clone this repository (or mimic the [`/examples`](https://github.com/anvilco/spectaql/blob/master/examples) directory) and play around with the example build and its data:
  ```sh
  npm develop ./examples/config.yml
  ```

That config will direct a build that flexes the most interesting parts of SpectaQL, so dig in a little and it should be a rewarding exercise.


## YAML Options

To generate your documentation, SpectaQL requires a configuration YAML. This file is where you can specify most of the options to make your output the way you'd like it. All the supported options and their descriptions can be found in the [config-example.yml](https://github.com/anvilco/spectaql/blob/master/config-example.yml) file.

You can also see a minimal-ish working example YAML in the [examples/config.yml](https://github.com/anvilco/spectaql/blob/master/examples/config.yml) file.

## Command Line Options

Several options are supported via the CLI. Some are exclusive to the CLI, while others are also possible to specify in the YAML config. Options specified in the CLI take precedence over those that exist in the YAML config. All the supported options and their descriptions can be found in [/bin/spectaql.js](https://github.com/anvilco/spectaql/blob/master/bin/spectaql.js).

## Metadata

In our experience, nearly all of the stuff we need for the content of the documentation comes from things supported in GraphQL and introspection queries...but not everything. To supplement some things that are missing, SpectaQL provides support for including "metadata" about your schema that can be used when generating the output. The following options are currently supported:
- `example`: When provided for a Field or Argument, this value will be used as an "example" for the Field or Argument. It can be any value supported in JSON.
- `examples`: Same as `example`, but allows an Array of examples to be provided, from which one random one will be used during generation.
- `undocumented`: A Boolean value that can be provided on a Type, Field, Argument, Query or Mutation indicating that this item is _**not**_ to be included in the resulting output. Useful for 1-off hiding of things where the default was to show them.
- `documented`: Just like `undocumented`, except it _**will**_ include it in the resulting output. Useful for 1-off showing of things where the default was to hide them.

SpectaQL supports 2 ways to include metadata to be used during processing:
1. Include your metadata in the introspection query (or introspection query results file). This requires manipulation of your introspection query results either on their way out from the server, or once in an output file. At Anvil, we use Apollo Server and leverage [this plugin we wrote](https://www.npmjs.com/package/@anvilco/apollo-server-plugin-introspection-metadata) to get our metadata into the introspection query results. [This example output](https://github.com/anvilco/spectaql/blob/master/examples/data/introspection-with-metadata.json) illustrates what an "interwoven" metadata scenario might look like.
2. Provide a standalone JSON file containing your metadata to be "woven" into your introspection query results by SpectaQL. SpectaQL uses the `addMetadata` method from [our Apollo Plugin](https://www.npmjs.com/package/@anvilco/apollo-server-plugin-introspection-metadata) under the hood, so please see the documentation there or [this example](https://github.com/anvilco/spectaql/blob/master/examples/data/metadata.json) file to understand its format.

## Dynamic Example Generators

In addition to being able to use any static examples you've provided, SpectaQL also supports dynamically generating examples for Fields and Arguments. When it comes time to generate an example, SpectaQL can pass all the necessary information about the Field or Argument to your generator in order for it to decide what the example should look like. See the included [example generator](https://github.com/anvilco/spectaql/blob/master/examples/customizations/examples/index.js) to see how it works.

**NOTE**: There is nothing wrong with this approach, and it may often times make the most sense. However, if you are thinking about going through the trouble of writing your own example generator methods, you might also consider taking that effort "upstream" and using it to add examples directly to your metadata *before* SpectaQL even gets involved. Just a thought.

## Custom Builds

The best option for customizing your output is to see if what you want to do is already supported out of the box:
- There are various options in the [CLI](#command-line-options) and [YAML](yaml-options) config for customizing your results.
- Overriding CSS is already supported. Check [customizations/scss](https://github.com/anvilco/spectaql/blob/master/customizations/scss) for more.
- Overriding "examples" for things is already supported via [metadata](#metadata), or via a [dynamic examples processor](#dynamic-examples-processor).


If you need to change or extend SpectaQL beyond what's supported out of the box, another option is to [fork SpectaQL on GitHub](https://help.github.com/articles/fork-a-repo/) and make your own modifications in the source. Forked repos are always public, so if you need changes to remain private you can consider doing a clone + mirror approach as [outlined here](https://stackoverflow.com/a/30352360/1427426). Either way, you can keep up-to-date by merging changes from the `master` branch. 

Please consider submitting a Pull Request (or asking first via an Issue) for anything you think would be a useful addition to SpectaQL.

Alternatively, you can just copy and modify the contents of `app` from the main repo and pass the path from your custom `app` path to the CLI using the `-a` flag.

## Optimizing Your Workflow

Using an API spec to generate your documentation has a number of great advantages, such as:

* **Maintain a single source**: Save time by removing the need to maintain a separate API spec and API documentation.
* **No more out-of-date documentation**: Your documentation will always be up-to-date with your API spec.
* **Be a better developer**: Your entire API system will be more stable and robust when built around your spec as a single source of truth.

## Development

When developing, you'll likely want to use the `-d` or `-D` development modes so that your output is hosted live for you, and changes to the code will trigger a rebuilding of the output:
```sh
npx spectaql -d path/to/config.yml
```

### Testing

> Under Construction

The changes we made from the DociQL project are significant, and as a result there is only a limited amount of test coverage at this point. However, new code should be tested, and unit tests for the existing code will be added in the future...or are welcome as pull requests!

Testing is powered by [Mocha](https://mochajs.org/)/[Chai](http://chaijs.com/) and uses the [BDD Lazy Var](https://github.com/stalniy/bdd-lazy-var) enhancement for writing RSpec-style tests.

Run `npm test` on the repository to start the automated tests.

## Caveats

While it's very robust, SpectaQL is still quite new and is evolving. It's likely that there will be some bugs, breaking-changes, and other odd things until things harden up a bit more over usage and time. Please keep this in mind.

## Contributors and Special Thanks

This library owes a very special thanks to the [DociQL](https://github.com/wayfair/dociql) project, which served as a great starting point for SpectaQL to build on top of.

## License

SpectaQL is licensed under the MIT License – see the [LICENSE.md](https://github.com/anvilco/spectaql/blob/master/LICENSE) for specific details.

## More Information

More info is available on the [SpectaQL homepage](https://github.com/anvilco/spectaql).


All contributions are welcome.

Good luck and enjoy SpectaQL!

[npm]: https://img.shields.io/npm/v/spectaql.svg
[npm-downloads]: https://img.shields.io/npm/dw/specatql
[npm-url]: https://www.npmjs.com/package/spectaql
