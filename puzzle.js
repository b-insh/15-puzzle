(function() {
  let puzzle = document.getElementById('puzzle');
  let gameSize = 15; // 8-, 15-, and 24-puzzle styling available (easily expanded to larger games (though they will be unsolvable :) ))
  let cellOrder = _.shuffle(_.range(1, gameSize + 1));
  console.log(cellOrder);
  createGame();

  function createGame() {
    for (let i = 0; i <= cellOrder.length; i++) {
      let cell = document.createElement('div');
      if (i < gameSize) {
        cell.innerHTML = cellOrder[i];
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
    let empty = emptyCell();

    let swaps = [];
    let greater = Math.max(parseInt(selected), parseInt(empty.id));
    let nextCell = Math.min(parseInt(selected), parseInt(empty.id));

    if (inRow(selected, empty.id)) {
      while (nextCell <= greater) {
        swaps.push(document.getElementById(nextCell));
        nextCell += 1;
      }

    } else if (inColumn(selected, empty.id)) {
      while (nextCell <= greater) {
        swaps.push(document.getElementById(nextCell));
        nextCell += Math.sqrt(gameSize + 1);
      }
    }

    if (parseInt(empty.id) > selected) {
      swaps.reverse();
    }

    swapCells(swaps, empty);
  }

  function swapCells(cells, empty) {
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];

      if (cell.classList.contains('empty')) continue;

      let temp = cell.innerHTML;
      cell.innerHTML = "";
      cell.classList.add("empty");
      empty.classList.remove("empty");
      empty.innerHTML = temp;

      empty = emptyCell();
    }
  }

  function inRow(selected, empty) {
    if (empty == selected) return false;

    let numRows = Math.sqrt(gameSize + 1);

    for (let row = numRows; row <= gameSize + 1; row += numRows) {
      let rowBeginning = row - numRows + 1;
        if ((rowBeginning <= selected && selected <= row) && (rowBeginning <= empty && empty <= row )) {
          return true;
        }
    }
    return false;
  }

  function inColumn(selected, empty) {
    if (empty == selected) return false;

    let numRows = Math.sqrt(gameSize + 1);
    let startVal = selected % numRows;

    for (let i = startVal; i <= gameSize+ 1; i += numRows) {
      if (i == empty) return true;
    }
    return false;
  }

  function emptyCell() {
    return document.querySelector('.empty');
  }

}());
