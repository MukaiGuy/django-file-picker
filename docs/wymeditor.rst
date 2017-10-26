The WYMeditor App
=================

The WYMeditor app is included to make it easy to integrate a File Picker with a popular WYSIWYG
interface. WYMeditor is a Javascript based editor. Its documentation can be found `here
<http://www.wymeditor.org/>`_. This application offers an extra form widget for applying WYMeditor
to a text field with buttons for files and images if desired.

WYMeditorWidget
---------------

.. class:: file_picker.wymeditor.widgets.WYMeditorWidget

To use the WYMeditorWidget, override the desired form field's widget.  It takes in a
dictionary with expected keys `"image"` and/or `"file"` these define which button
is used to call the overlay, either an image or a paper clip icon respectively.

Example TextField Override
**************************
An example using a *formfield_override* in an admin class use WYMeditor and
File Picker for each `TextField` in the form.

::

    class PostAdmin(admin.ModelAdmin):
            formfield_overrides = {
                models.TextField: {
                    'widget': file_picker.wymeditor.widgets.WYMeditorWidget(
                        pickers={
                            'image': "images",
                            'file': "files",
                        }
                    ),
                },
            }

            class Media:
                js = ("http://cdn.jquerytools.org/1.2.5/full/jquery.tools.min.js",)
