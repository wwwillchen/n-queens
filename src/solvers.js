/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.generateEmptyMatrix = function(n){
  var array = new Array(n);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(n);
    for (var j = 0; j < array[i].length; j++ ) {
      array[i][j] = 0;
    }
  }
  return array;
};
console.log(this);
window.copyMatrix = function(matrix) {
  var newMatrix = [];
  for (var i = 0; i < matrix.length; i++) {
    newMatrix.push(matrix[i].slice());
  }
  return newMatrix;
};

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme



  var subRoutine = function(matrix, numRooks) {
    var x = numRooks;
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var m = copyMatrix(matrix);
        if ( m[r][c] === 0 ) {
          m[r][c] = 1;
          if ( x < n ) {
            subRoutine(m, x + 1);
          }
        } else if (x === n) {
          // check if m has conflict
          var board = new Board(m);
          if (!board.hasAnyRooksConflicts()) {
            solution = m;
          }
        }
      }
    }
  };



  subRoutine(generateEmptyMatrix(n), 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = undefined; //fixme
  var solutionObj = {};

  var subRoutine = function(matrix, numRooks) {
    var x = numRooks;
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        var m = copyMatrix(matrix);
        if ( m[r][c] === 0 ) {
          m[r][c] = 1;
          if ( x < n ) {
            subRoutine(m, x + 1);
          }
        } else if (x === n) {
          // check if m has conflict
          var board = new Board(m);
          if (!board.hasAnyRooksConflicts()) {
            solutionObj[JSON.stringify(m)] = true;
          }
        }
      }
    }
  };

  subRoutine(generateEmptyMatrix(n), 0);

  solutionCount = Object.keys(solutionObj).length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// window.countNRooksSolutions = function(n) {
//   var solution = undefined; //fixme
//   var solutionArr = [];

//   var subRoutine = function(matrix, numRooks, rowIndex, colIndex) {
//     var x = numRooks;
//     for (var r = rowIndex; r < n; r++) {
//       for (var c = colIndex; c < n; c++) {
//         var m = copyMatrix(matrix);
//         if ( m[r][c] === 0 ) {
//           m[r][c] = 1;
//           if ( x < n ) {
//             subRoutine(m, x + 1, r, c);
//           }
//         } else if (x === n) {
//           // check if m has conflict
//           var board = new Board(m);
//           if (!board.hasAnyRooksConflicts()) {
//             solutionArr.push(m);
//           }
//         }
//       }
//     }
//   };

//   subRoutine(generateEmptyMatrix(n), 0, 0, 0);

//   solutionCount = solutionArr.length;
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
