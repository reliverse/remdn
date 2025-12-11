# file

The `file` generator reads a file and inlines it's contents.

## Example

<!-- remdn:example generator=file src="../../test/fixture/src/example.ts" code -->

### Input

    <!-- remdn:file src="../../test/fixture/src/example.ts" code -->
    <!-- /remdn -->

### Output

    <!-- remdn:file src="../../test/fixture/src/example.ts" code -->

    ```ts [example.ts]
    /**
    * Adds two numbers together.
    *
    * @example
    *
    * ```js
    * add(1, 2); // 3
    * ```
    */
    export function add(a: number, b: number) {
    return a + b;
    }

    export const object = {
    /**
    * An object key
    */
    key: {
    /**
    * A subkey
    */
    subkey: "value",
    },
    };
    ```

    <!-- /remdn -->

<!-- /remdn -->

## Arguments

::field-group

::field{name="src" type="string"}
Relative path to the file.
::

::field{name="code" type="boolean"}
Render file as code.
::

::field{name="lang" type="string"}
Code lang.
::

::field{name="name" type="string|boolean"}
File name in code. Use `no-name` to disable name in code.
::

::field{name="noTrim" type="boolean"}
Don't trim the file contents.
::
