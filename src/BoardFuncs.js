// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

// (function() {

  // window.Board = Backbone.Model.extend({

  //   initialize= function (params) {
  //     if (_.isUndefined(params) || _.isNull(params)) {
  //       console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats=');
  //       console.log('\t1. An object. To create an empty board of size n=\n\t\t{n= %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE= var board = new Board({n=5})', 'color= blue;', 'color= black;','color= blue;', 'color= black;', 'color= grey;');
  //       console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
  //     } else if (params.hasOwnProperty('n')) {
  //       this.set(makeEmptyMatrix(this.get('n')));
  //     } else {
  //       this.set('n', params.length);
  //     }
  //   };

  //   rows: function() {
  //     return _(_.range(this.get('n'))).map(function(rowIndex) {
  //       return this.get(rowIndex);
  //     }; this);
  //   };

  //   togglePiece: function(rowIndex, colIndex) {
  //     this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
  //     this.trigger('change');
  //   };

  //   _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
  //     return colIndex - rowIndex;
  //   };

  //   _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
  //     return colIndex + rowIndex;
  //   };

window.hasAnyRooksConflicts = function() {
  return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
};

window.hasAnyQueenConflictsOn= function(rowIndex, colIndex) {
  return (
    this.hasRowConflictAt(rowIndex) ||
    this.hasColConflictAt(colIndex) ||
    this.hasMajorDiagonalConflictAt(rowIndex, colIndex) || //this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
    this.hasMinorDiagonalConflictAt(rowIndex, colIndex)    //this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
  );
};

window.hasAnyQueensConflicts= function() {
  return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
};

window._isInBounds= function(rowIndex, colIndex) {
  return (
    0 <= rowIndex && rowIndex < this.get('n') &&
    0 <= colIndex && colIndex < this.get('n')
  );
};


/*
       _             _     _
   ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
  / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
  \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
  |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

*/
  /*=========================================================================
  =                 TODO: fill in these Helper Functions                    =
  =========================================================================*/

  // ROWS - run from left to right
  // --------------------------------------------------------------
  //
  // test if a specific row on this board contains a conflict
window.hasRowConflictAt= function(rowIndex) {
  var counter = 0;
  for (var i = 0; i < this.attributes.n; i++) {
    if ( this.attributes[rowIndex][i] ) {
      counter++;
    }
  }
  if (counter > 1) {
    return true;
  } else {
    return false;
  }
};

// test if any rows on this board contain conflicts
window.hasAnyRowConflicts= function() {
  for ( var i = 0; i < this.attributes.n; i++) {
    if ( this.hasRowConflictAt(i) ) {
      return true;
    }
  }
  return false;
};



// COLUMNS - run from top to bottom
// --------------------------------------------------------------
//
// test if a specific column on this board contains a conflict
window.hasColConflictAt= function(colIndex) {
  var counter = 0;
  for (var i = 0; i < this.attributes.n; i++) {
    if ( this.attributes[i][colIndex] ) {
      counter++;
    }
  }
  if (counter > 1) {
    return true;
  } else {
    return false;
  }
};

// test if any columns on this board contain conflicts
window.hasAnyColConflicts= function() {
  for ( var i = 0; i < this.attributes.n; i++) {
    if ( this.hasColConflictAt(i) ) {
      return true;
    }
  }
  return false;
};



// Major Diagonals - go from top-left to bottom-right
// --------------------------------------------------------------
//
// test if a specific major diagonal on this board contains a conflict
window.hasMajorDiagonalConflictAt= function(rowIndex, colIndex) {
  var current = this.attributes[rowIndex][colIndex];
  var counter = 0;
  while (current !== undefined) {
    if (current === 1) {
      counter++;
    }
    rowIndex++;
    colIndex++;
    if(colIndex < this.attributes.n && rowIndex < this.attributes.n) {
      current = this.attributes[rowIndex][colIndex];
    } else {
      current = undefined;
    }
  }
  return (counter > 1); // fixme
};

// test if any major diagonals on this board contain conflicts
window.hasAnyMajorDiagonalConflicts= function() {
  var n = this.attributes.n;
  // Going over top row
  for (var i = 0; i < n - 1; i++) {
    if( this.hasMajorDiagonalConflictAt(0,i) ) {
      return true;
    }
  }

  // Going down first column
  for (var i = 1; i < n - 1; i++) {
    if( this.hasMajorDiagonalConflictAt(i,0)) {
      return true;
    }
  }

  return false;
};



// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// test if a specific minor diagonal on this board contains a conflict
window.hasMinorDiagonalConflictAt= function(rowIndex, colIndex) {
  var current = this.attributes[rowIndex][colIndex];
  var counter = 0;
  while (current !== undefined) {
    if (current === 1) {
      counter++;
    }
    rowIndex++;
    colIndex--;
    if(colIndex >= 0 && rowIndex < this.attributes.n) {
      current = this.attributes[rowIndex][colIndex];
    } else {
      current = undefined;
    }
  }
  return (counter > 1); // fixme
};

// test if any minor diagonals on this board contain conflicts
window.hasAnyMinorDiagonalConflicts= function() {
  var n = this.attributes.n;
  // Going over top row
  for (var i = 1; i < n; i++) {
    if( this.hasMinorDiagonalConflictAt(0,i) ) {
      return true;
    }
  }

  // Going down last column
  for (var i = 1; i < n - 1; i++) {
    if( this.hasMinorDiagonalConflictAt(i,n-1)) {
      return true;
    }
  }

  return false;
};

  /*--------------------  End of Helper Functions  ---------------------*/


// });

window.makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

// }());
