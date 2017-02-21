(function() {
  let puzzle = document.getElementById('puzzle');
  // 8-, 15-, and 24-puzzle styling available
  let gameSize = 15;
  let sideLength = Math.sqrt(gameSize + 1);
  // create shuffled array of values 1 through gameSize
  let cellOrder = _.shuffle(_.range(1, gameSize + 1));
  createBoard();

  function createBoard() {
    let j = 0;
    for (let i = 0; i <= cellOrder.length; i++) {
      // only increases j if the rows are an even length, otherwise don't need to switch colors on row change
      if (i % sideLength === 0 && sideLength % 2 === 0) j += 1;

      let cell = document.createElement('div');
      if (i < gameSize) {
        cell.innerHTML = cellOrder[i];
        cell.classList.add((i % 2 === 1 && j % 2 === 1) || (i % 2 === 0 && j % 2 === 0) ? "dark" : "light" );
      } else {
        cell.innerHTML = "";
        cell.classList.add('empty');
      }

      cell.id = i + 1;
      cell.addEventListener('click', (e) => slideCells(e.target.id), false);
      puzzle.appendChild(cell);
    }
  }

  function slideCells(selected) {
    let swaps = [];
    let empty = emptyCell();
    let emptyId = parseInt(empty.id);
    let greater = Math.max(parseInt(selected), emptyId);
    let nextCell = Math.min(parseInt(selected), emptyId);

    if (inRow(selected, emptyId)) {
      while (nextCell <= greater) {
        swaps.push(document.getElementById(nextCell));
        nextCell += 1;
      }

    } else if (inColumn(selected, emptyId)) {
      while (nextCell <= greater) {
        swaps.push(document.getElementById(nextCell));
        nextCell += sideLength;
      }
    }
    // if the empty space is ahead of the selected cell, the cells must slide "forward"
    if (emptyId > selected) {
      swaps.reverse();
    }

    swapCells(swaps, empty);
  }

  function swapCells(cells, empty) {
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];

      if (cell.classList.contains('empty')) continue;

      let tempHTML = cell.innerHTML;
      cell.innerHTML = "";
      empty.innerHTML = tempHTML;

      let tempClass = cell.classList.contains('light') ? "light" : "dark";
      cell.classList.remove(tempClass);
      cell.classList.add("empty");
      empty.classList.remove("empty");
      empty.classList.add(tempClass);

      empty = emptyCell();
    }
  }

  function inRow(selected, empty) {
    if (empty === selected) return false;

    let numRows = sideLength;

    for (let row = numRows; row <= gameSize + 1; row += numRows) {
      let rowBeginning = row - numRows + 1;
      // checks if the selected cell and empty cell are in the same row
        if ((rowBeginning <= selected && selected <= row) && (rowBeginning <= empty && empty <= row )) {
          return true;
        }
    }
    return false;
  }

  function inColumn(selected, empty) {
    if (empty === selected) return false;

    let numRows = sideLength;
    let startVal = selected % numRows;
    // checks if the selected cell and empty cell are in the same column, if so their cell ids will have a difference of some multiple of the row length
    for (let i = startVal; i <= gameSize+ 1; i += numRows) {
      if (i === empty) return true;
    }
    return false;
  }

  function emptyCell() {
    return document.querySelector('.empty');
  }

}());
