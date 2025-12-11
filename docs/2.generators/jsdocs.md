# jsdocs

The `jsdocs` generator can automatically read through your code and extract and sync documentation of function exports leveraging JSDocs and TypeScript hints.

Internally it uses [untyped](https://untyped.unjs.io/) and [jiti](https://github.com/unjs/jiti) loader for JSDocs parsing and TypeScript support.

## Example

<!-- remdn:example generator=jsdocs src="../../test/fixture/src/example" -->

### Input

    <!-- remdn:jsdocs src="../../test/fixture/src/example" -->
    <!-- /remdn -->

### Output

    <!-- remdn:jsdocs src="../../test/fixture/src/example" -->

    ### `add(a, b)`

    Adds two numbers together.

    **Example:**

    ```js
    add(1, 2); // 3
    ```

    ### `object`

    #### `key`

    An object key

    ##### `subkey`

    - **Type**: `string`
    - **Default**: `"value"`

    A subkey

    <!-- /remdn -->

<!-- /remdn -->

## Arguments

::field-group

::field{name="src" type="string"}
Path to the source file. The default is `./src/index` and can be omitted.
::

::field{name="headingLevel" type="number"}
Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for the title in nested levels.
::

::field{name="group" type="string"}
Only render function exports annotated with `@group name`. By default, there is no group filter. Value can be a string or an array of strings.
::

::
