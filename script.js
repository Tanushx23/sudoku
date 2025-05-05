const board=document.querySelector('.board');

for(let i=0;i<81;i++){
  const input=document.createElement("input");
  input.setAttribute("type","number");
  input.setAttribute("min","1");
  input.setAttribute("max","9");
  board.appendChild(input);
}

// function to get the board filled with values
function getBoard(){
  const inputs=board.querySelectorAll("input");
  const matrix=[];

  for(let i=0;i<9;i++){
    const row=[];
    for(let j=0;j<9;j++){
      const val=inputs[i*9+j].value;
      row.push(val ? parseInt(val): 0);
    }
    matrix.push(row);
  }
  return matrix;
}

//function to set the board with the real values 
function setBoard(matrix){
  const inputs=board.querySelectorAll("input");
  for (let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      inputs[i*9+j].value = matrix[i][j] != 0 ? matrix[i][j] : "";
    }
  }
}

//function to check if the number is valid for the particular cell
function isValid(board,row,col,num){
  for(let i=0;i<9;i++){
    //checking in the row and column
    if(board[row][i]==num || board[i][col]==num){
      return false;
    }
  }
    //checking in the box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
  return true;
}

//function to iterate through the sudoku and solve the sudoku
function solveSudoku(board){
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      if(board[i][j]==0){
        for(let num=1;num<=9;num++){
          if(isValid(board,i,j,num)){
            board[i][j]=num;

            if(solveSudoku(board)){
              return true;
            }

            board[i][j]=0;
          }
        }
        return false;
      }
    }
  }
  return true;
}


//function to solve 
function solve() {
  const matrix = getBoard();
  console.log("hello");
  if (solveSudoku(matrix)) {
    setBoard(matrix);
    alert("Solved!");
  } else {
    alert("No solution found!");
  }
}


// function to clear the board
function clearBoard() {
  const inputs = board.querySelectorAll("input");
  inputs.forEach(input => input.value = '');
}
