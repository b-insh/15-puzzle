(function() {
  let puzzle = document.getElementById('puzzle');
  let gameSize = 15; // 8-, 15-, and 24-puzzle available (easily expanded to larger games (though they will be essentially impossible))
  createGame(gameSize);

  function createGame(size) {
    for (let i = 1; i <= size + 1; i++) {
      let cell = document.createElement('div');
      if (i <= size) {
        cell.innerHTML = i;
        cell.id = i;
      } else {
        cell.innerHTML = "";
        cell.id = 16;
        cell.classList.add('empty');
      }
      cell.addEventListener('click', (e) => slideCells(e.target.id), false);
      puzzle.appendChild(cell);
    }
  }

  function slideCells(selected) {
    let empty = document.querySelector('.empty');
    // debugger

    if (inRow(selected, empty.id)) {
      let swaps = [];
        let greater = Math.max(parseInt(selected), parseInt(empty.id));
        let nextCell = Math.min(parseInt(selected), parseInt(empty.id));

        while (nextCell <= greater) {
          swaps.push(document.getElementById(nextCell));
          nextCell += 1;
        }

        if (empty.id > selected) {
          swaps.reverse();
        }

        swapCellsinRow(swaps, empty);

    } else if (inColumn(selected, empty.id)) {

    }
  }

  function swapCellsinRow(cells, empty) {
    // debugger
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.classList.contains('empty')) continue;

      let temp = cell.innerHTML;
      cell.innerHTML = "";
      cell.classList.add("empty");
      empty.classList.remove("empty");
      empty.innerHTML = temp;

      empty = document.querySelector('.empty');
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

  function emptycell() {
    return document.querySelector('.empty').id;
  }

}());
