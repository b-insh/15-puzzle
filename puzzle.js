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
        cell.addEventListener('click', (e) => canMove(e.target.id), false);
      } else {
        cell.innerHTML = "";
        cell.id = 16;
        cell.classList.add('empty');
      }
      puzzle.appendChild(cell);
    }
  }

  function slideCells() {


  }

  function canMove(selectedCell) {
    console.log(inRow(selectedCell));
    // if (inRow(selectedCell) || inColumn(selectedCell)) {
    //   slideCells();
    // }
  }

  function inRow(selected) {
    let empty = document.querySelector('.empty').id;
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

  function inColumn(selected) {
    let empty = document.querySelector('.empty').id;
    if (empty == selected) return false;



  }

  function emptycell() {
    return document.querySelector('.empty').id;
  }

}());
