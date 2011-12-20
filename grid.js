/* Create a grid and add it to the document.
 * A grid is a fixed-size table of draggable, clickable and reordable cells.
 * Each cell may be assigned a thumbnail image, which is stored in a "contents"
 * div.
 *
 * The relevant classes assigned to the grid are:
 *     "ui-grid-grid", assigned to the table element;
 *     "ui-grid-row", assigned to each individual row;
 *     "ui-grid-cell", assigned to each individual cell;
 *     "ui-grid-cell-content", assigned to the draggable cell contents;
 *     "ui-grid-grid-dragging", assigned to the grid while a cell is dragged;
 *
 * Parameters:
 * 'rows': the number of rows in the grid.
 * 'cols': the number of cells per row.
 *
 */
function Grid(rows, cols, cellHeight, cellWidth) {
    var rows = rows;
    var cols = cols;

    // Flat cell index
    var cellIndex = new Array(rows*cols);

    // Initialization of the grid
    var table = document.createElement("table");
    $(table).addClass("ui-grid-grid");

    // Create rows
    for (i = 0; i < rows; i++) {
        row = document.createElement("tr");
        $(row).addClass("ui-grid-row");

        // Create cells
        for (j = 0; j < cols; j++) {
            cell = document.createElement("td");
            $(cell).addClass("ui-grid-cell");

            // Make cell contents droppable onto cells.
            $(cell).droppable({
                accept: ".ui-grid-cell-content",
                drop: function(event, ui) {
                    $(ui.draggable).css({top: 0, left: 0});

                    if (this.firstChild) {
                        $(ui.draggable.parent()).append(this.firstChild);
                    }
                    $(this).append(ui.draggable);
                }
            });

            row.appendChild(cell);
            cellIndex[i*rows + j] = cell;
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);

    // Methods

    /* fillCell: Occupy a cell.
     * 'row': the row of the cell.
     * 'col': the column number of the cell.
     * 'thumbnail': the url to a thumbnail for the cell.
     *
     * Note: Removes the previous content if the cell is not empty.
     */
    this.fillCell = function(row, col, thumbnail) {
        this.wipeCell(row, col);
        cell = this.getCell(row, col);

        /* The fact that cell's contents are divs and not imgs is due to a bug
         * in dragging that appears in Chrome (and maybe IE).
         * Original source for workaround:
         * http://stackoverflow.com/questions/3297779
         */
        content = document.createElement("div");
        $(content).css({
            "background": "url(" + thumbnail + ")",
            "background-size": "100%",
            "width": "100%",
            "height": "100%",
        });

        $(content).addClass("ui-grid-cell-content");
        $(content).draggable({
            containment: $(this.table), // keep content confined to the grid
            snap: ".ui-grid-cell", // make it snap to cells...
            snapMode: "inner", // but only to their inner borders...
            snapTolerance: 5, // and when close, for smoother dragging
            zIndex: 1, // stack above other draggables while dragging
            revert: "invalid", // move back to original cell when fail
            revertDuration: 1,
            start: function() {
                $(table).addClass("ui-grid-grid-dragging");
            },
            stop: function() {
                $(table).removeClass("ui-grid-grid-dragging");
            }
        });

        $(cell).append(content);
        return cell;
    }

    /* Get a cell at specified row and column.
     * 'row': the row of the cell.
     * 'col': the column of the cell.
     *
     * Returns the td element for the specified cell.
     */
    this.getCell = function(row, col) {
        return cellIndex[row*cols + col];
    }

    /* Get the content div of a cell at specified row and column.
     * 'row': the row of the cell.
     * 'col': the column of the cell.
     */
    this.getCellContent = function(row, col) {
        return this.getCell(row, col).firstChild;
    }

    /* Empty a cell.
     * 'row': the row of the cell.
     * 'col': the column of the cell.
     */
    this.wipeCell = function(row, col) {
        $(this.getCell(row, col)).empty();
    }
}
