# with-remdn

The `with-remdn` generator generates a benner that notifies docs are updated with remdn + the last update time.

## Example

<!-- remdn:example generator=with-remdn -->

### Input

    <!-- remdn:with-remdn -->
    <!-- /remdn -->

### Output

    <!-- remdn:with-remdn -->

    ---

    _🤖 auto updated with [remdn](https://remdn.unjs.io)_

    <!-- /remdn -->

<!-- /remdn -->

## Arguments

::field-group

::field{name="lastUpdate" type="string"}
Show last updated date. (use string for static value)
::

::field{name="no-separator" type="boolean"}
Disable addition of separator `---`
::

::
