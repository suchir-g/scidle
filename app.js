var sortedElems = [
  "Ac",
  "Ag",
  "Al",
  "Am",
  "Ar",
  "As",
  "At",
  "Au",
  "B",
  "Ba",
  "Be",
  "Bh",
  "Bi",
  "Bk",
  "Br",
  "C",
  "Ca",
  "Cd",
  "Ce",
  "Cf",
  "Cl",
  "Cm",
  "Cn",
  "Co",
  "Cr",
  "Cs",
  "Cu",
  "Db",
  "Ds",
  "Dy",
  "Er",
  "Es",
  "Eu",
  "F",
  "Fe",
  "Fl",
  "Fm",
  "Fr",
  "Ga",
  "Gd",
  "Ge",
  "H",
  "He",
  "Hf",
  "Hg",
  "Ho",
  "Hs",
  "I",
  "In",
  "Ir",
  "K",
  "Kr",
  "La",
  "Li",
  "Lr",
  "Lu",
  "Lv",
  "Mc",
  "Md",
  "Mg",
  "Mn",
  "Mo",
  "Mt",
  "N",
  "Na",
  "Nb",
  "Nd",
  "Ne",
  "Nh",
  "Ni",
  "No",
  "Np",
  "O",
  "Og",
  "Os",
  "P",
  "Pa",
  "Pb",
  "Pm",
  "Po",
  "Pr",
  "Pt",
  "Pu",
  "Ra",
  "Rb",
  "Re",
  "Rf",
  "Rg",
  "Rh",
  "Rn",
  "Ru",
  "S",
  "Sb",
  "Sc",
  "Se",
  "Sg",
  "Si",
  "Sm",
  "Sn",
  "Sr",
  "Ta",
  "Tb",
  "Tc",
  "Te",
  "Th",
  "Ti",
  "Tl",
  "Tm",
  "Ts",
  "U",
  "V",
  "W",
  "Xe",
  "Y",
  "Yb",
  "Zn",
  "Zr",
];
var possibleWords = [
  ["Ac", "Cu", "Ra", "C", "Y"],
  ["Al", "Co", "Ho", "Li", "C"],
  ["Al", "I", "Mo", "N", "Y"],
  ["Am", "P", "U", "Ta", "Te"],
  ["Ar", "Ge", "N", "Ti", "Na"],
  ["Am", "Er", "I", "Ca", "N"],
  ["Au", "C", "Ti", "O", "N"],
  ["B", "Er", "S", "Er", "K"],
  ["Br", "U", "N", "C", "H"],
  ["C", "Ho", "Co", "La", "Te"],
  ["C", "O", "U", "P", "Es"],
  ["C", "Y", "B", "O", "Rg"],
  ["Dy", "N", "Am", "I", "C"],
  ["Dy", "N", "Am", "I", "Te"],
  ["Dy", "Na", "S", "Ti", "Es"],
  ["Er", "Os", "I", "O", "N"],
  ["F", "O", "Re", "V", "Er"],
  ["Fr", "Ac", "Ti", "O", "N"],
  ["F", "U", "Si", "O", "N"],
  ["Ge", "Ne", "S", "I", "S"],
  ["He", "Li", "Co", "Pt", "Er"],
  ["In", "S", "P", "I", "Re"],
  ["Kr", "Y", "Pt", "O", "N"],
  ["Li", "Fe", "S", "Pa", "N"],
  ["Mo", "C", "K", "Er", "Y"],
  ["Os", "Mo", "S", "I", "S"],
  ["P", "H", "Y", "Si", "Cs"],
];

const alphabet = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  "✓",
  "✖",
];

var currentRow = 0;
var currentCol = 0;

var inGame = true;

var height = 8;
var width = 5;

var word = possibleWords[Math.floor(Math.random() * possibleWords.length)];

window.onload = () => initialize();

function initialize() {
  genBoard();
  genElemBoard();
  genKeyboard();

  let currentTile = document.getElementById(
    currentRow.toString() + "-" + currentCol.toString()
  );

  document.addEventListener("keyup", (event) => {
    //Sets the current tile to the... current tile.
    currentTile = document.getElementById(
      currentRow.toString() + "-" + currentCol.toString()
    );
    if (currentCol >= 1) {
      document
        .getElementById(`${currentRow}-${currentCol - 1}`)
        .classList.remove("highlighted");
    }

    if (inGame) {
      currentTile.classList.add("highlighted");
    } else {
      return;
    }

    if ("KeyA" <= event.code && event.code <= "KeyZ") {
      if (currentCol <= 4) {
        if (currentTile.innerText.length < 2) {
          if (currentTile.innerText.length == 1) {
            currentTile.innerText += event.code[3].toLowerCase();
          } else {
            currentTile.innerText = event.code[3].toUpperCase();
          }
        }
      }
    } else if (event.code == "Backspace") {
      if (currentTile.innerText == "" && 0 < currentCol && currentCol < width) {
        currentTile.classList.remove("highlighted");
        currentCol--;
        document
          .getElementById(`${currentRow}-${currentCol}`)
          .classList.add("highlighted");
      }
      currentTile.innerText = "";
    } else if (event.code == "Enter") {
      currentTile.classList.remove("incorrectElem");

      if (sortedElems.indexOf(currentTile.innerText) != -1) {
        if (currentCol == 4 && currentTile.innerText != "") {
          update();
          currentRow++;
          currentCol = 0;
        } else if (currentTile.innerText != "" && inGame) {
          if (sortedElems.indexOf(currentTile.innerText) != -1) {
            currentCol++;

            //Right now the current tile is not the actual current tile, but the previous tile
            //Removing the style from the PREVIOUS TILE.
            currentTile.classList.remove("highlighted");

            //Sets the current tile to the CURRENT TILE
            currentTile = document.getElementById(
              currentRow.toString() + "-" + currentCol.toString()
            );
            //Applies the real style
            currentTile.classList.add("highlighted");
          } else {
            currentTile.classList.remove("incorrectElem");
          }
        }
      } else {
        currentTile.classList.toggle("incorrectElem");
      }
    }
  });
}

function update() {
  //This tracks how much elements are correct
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      currentRow.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;
    let elemButton = document.getElementById(letter);
    let closeTo = false;
    for (let l of word) {
      if (letter[0] == l[0]) {
        closeTo = true;
        break;
      }
    }
    if (word[c] == letter) {
      currentTile.classList.add("correct");
      correct++;
      elemButton.classList.add("correct-et-item");
    } else if (word.includes(letter)) {
      currentTile.classList.add("incorrect");
      elemButton.classList.add("correct-et-item");
    } else if (closeTo) {
      currentTile.classList.add("near-match");
      elemButton.classList.add("absent-et-item");
    } else {
      currentTile.classList.add("absent");
      elemButton.classList.add("absent-et-item");
      for (let elem of sortedElems) {
        if (elem[0] == letter[0]) {
          document.getElementById(elem).classList.add("absent-et-item");
        }
      }
    }

    if (correct == width) {
      inGame = false;
      document.getElementById("answer").innerText = "WELL DONE!";
      for (let c of sortedElems) {
        let currButton = document.getElementById(c);
        if (word.indexOf(c) == -1) {
          currButton.classList.add("absent-et-item");
        }
      }
    } else if (currentRow == height - 1) {
      document.getElementById("answer").innerText = "Better luck next time :(";
    }
  }
}

function genBoard() {
  for (let i = 0; i < 5; i++) {
    let rowContainer = document.createElement("div");

    for (let j = 0; j < 8; j++) {
      let tile = document.createElement("span");

      tile.id = j.toString() + "-" + i.toString();
      tile.classList.add("tile");

      tile.innerText = "";
      rowContainer.appendChild(tile);
    }
    document.getElementById("board").appendChild(rowContainer);
  }
}

function genElemBoard() {
  let startPos = [0, Math.floor(sortedElems.length / 2)];
  let endPos = [Math.floor(sortedElems.length / 2), sortedElems.length];

  for (let temp = 0; temp < 2; temp++) {
    for (let i = startPos[temp]; i < endPos[temp]; i++) {
      let bItem = document.createElement("div");
      bItem.id = sortedElems[i];
      bItem.classList.add("et-item");

      bItem.innerText = sortedElems[i];
      bItem.addEventListener("click", () => {
        if (!inGame) return;
        let currentTile = document.getElementById(
          currentRow.toString() + "-" + currentCol.toString()
        );
        currentTile.innerText = sortedElems[i];
        if (currentCol < 4) currentCol += 1;
        currentTile.classList.add("highlighted");
        if (currentCol != 1) {
          document
            .getElementById(
              currentRow.toString() + "-" + (currentCol - 2).toString()
            )
            .classList.remove("highlighted");
        }
        if (currentCol == 4) {
          document
            .getElementById(currentRow.toString() + "-3")
            .classList.remove("highlighted");
          currentTile.classList.add("highlighted");
        }
        currentTile.classList.add("highlighted");
      });

      if (temp == 0) {
        document.getElementById("left-board").appendChild(bItem);
      } else {
        document.getElementById("right-board").appendChild(bItem);
      }
    }
  }
}

function genKeyboard() {
  for (let keyIndex = 0; keyIndex < 3; keyIndex++) {
    let keyBoardRow = document.getElementById(
      `keyboard-${keyIndex.toString()}`
    );
    let pos = [
      [0, 10],
      [10, 19],
      [19, 28],
    ];
    for (let i = pos[keyIndex][0]; i < pos[keyIndex][1]; i++) {
      let button = document.createElement("span");
      button.append(alphabet[i].toUpperCase());
      button.id = alphabet[i].toUpperCase();
      keyBoardRow.appendChild(button);
      button.addEventListener("click", () => {
        let currentTile = document.getElementById(
          currentRow.toString() + "-" + currentCol.toString()
        );
        currentTile.classList.remove("incorrectElem");
        currentTile.classList.add("highlighted");
        if (currentCol >= 1) {
          document
            .getElementById(`${currentRow}-${currentCol - 1}`)
            .classList.remove("highlighted");
        }
        if (button.id !== "✓" && button.id !== "✖") {
          if (currentTile.innerText.length == 1) {
            currentTile.innerText += button.id.toLowerCase();
          } else if (currentTile.innerText.length == 0) {
            currentTile.innerText += button.id.toUpperCase();
          }
          currentTile = document.getElementById(
            currentRow.toString() + "-" + currentCol.toString()
          );
          if (
            currentCol < 4 &&
            currentTile.innerText.length == 2 &&
            sortedElems.indexOf(currentTile.toString()) != -1
          ) {
            currentCol++;
          }
          currentTile = document.getElementById(
            currentRow.toString() + "-" + currentCol.toString()
          );
          console.log("Helo");
        } else if (button.id == "✓") {
          if (sortedElems.indexOf(currentTile.innerText) != -1) {
            if (currentCol == 4 && currentTile.innerText != "") {
              update();
              currentRow++;
              currentCol = 0;
            } else {
              currentCol++;
            }
          } else {
            currentTile.classList.add("incorrectElem");
          }
        } else if (button.id == "✖") {
          if (
            currentTile.innerText == "" &&
            0 < currentCol &&
            currentCol < width
          ) {
            currentTile.classList.remove("highlighted");
            currentCol--;
            document
              .getElementById(`${currentRow}-${currentCol}`)
              .classList.add("highlighted");
          }
          currentTile.innerText = "";
        }
      });
    }
  }
}
//HOW TO PLAY

const modal_open = document.getElementById("modal-open");
const modal_container = document.getElementById("modal-container");
const modal_close = document.getElementById("modal-close");

document.addEventListener("click", (event) => {
  if (modal_container.classList.contains("show")) {
    if (event.target != modal_container) {
      setTimeout(() => modal_container.classList.remove("show"), 100);
    }
  } else {
    if (event.target == modal_open) {
      setTimeout(() => modal_container.classList.add("show"), 100);
    }
  }
});
