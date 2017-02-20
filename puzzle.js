(function() {
  let puzzle = document.getElementById('puzzle');
  let gameSize = 15;
  createGame(gameSize);
  console.log(gameSize);


  function createGame(size) {
    for (let i = 1; i <= size; i++) {
      let cell = document.createElement('div');
      cell.innerHTML = i;
      puzzle.appendChild(cell);
    }

    let emptyCell = document.createElement('div');
    emptyCell.innerHTML = "empty";
    emptyCell.classList.add('empty');
    puzzle.appendChild(emptyCell);
  }

}());
