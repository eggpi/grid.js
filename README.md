grid
====

grid is a very simple grid of draggable, reordable thumbnail images.
Any thumbnail can be dragged onto any slot in the grid, and if that slot is
already occupied by another image, the two slots are swapped.

The rest is up to you
=====================

grid itself consists only of the code responsible for defining a table and
managing the thumbnails. All styling information (in particular, the size of
each cell in the grid) is left for the application to define.

This turns out to be quite easy, since grid hides nothing from you: all
elements corresponding to the table, its rows and cells are easily accessible,
and convenient CSS classes are set for them upon some interesting events.

For more information, please see the (nicely commented) source code.

Dependencies and Compatibility
==============================

grid is built on top of JQuery and JQuery UI, so you will need these.

It has been tested with JQuery 1.7.1 and JQuery UI 1.7.2, on both Firefox 8 and
Chromium 15.0.874.121. Your mileage will, of course, vary.

Licensing
=========

grid is available under the MIT license.
