// we manage the options selection

const activeCellElement = document.getElementById("active-cell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underlined");
const addSheet = document.getElementById("addSheet");
const sheetName = document.getElementsByClassName("sheetName");



// activeCell defines which cell is selected / active.
let activeCell = null;

let activeOptionsState;

// below function will be triggered whenever cell is focused.
function onCellFocus(e) {
  // whenever a cell is focused change the activeCell value to be the id of cell.
  if (activeCell && activeCell.id === e.target.id) {
    // previously selected cell is equal to the currently selected cell.
    return;
  }
  activeCell = e.target;
  activeCellElement.innerText = e.target.id;
  // intialise the state of this cell.
  const computedStyle = getComputedStyle(activeCell);
  activeOptionsState = {
    fontFamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
  };

  highlightOptionButtonsOnFocus();
}

// toggle options menu class 
function toggleButtonsStyle(button, isSelected) {
  if (isSelected) {
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }
}

//toggling the classes of menu options based on selection
function highlightOptionButtonsOnFocus() {
  toggleButtonsStyle(boldButton, activeOptionsState.isBoldSelected);
  toggleButtonsStyle(italicButton, activeOptionsState.isItalicSelected);
  toggleButtonsStyle(underlinedButton, activeOptionsState.isUnderLineSelected);
  highlightTextAlignButtons(activeOptionsState.textAlign);
}


  // this function will be triggered when user clicks on the Bold button.
function onClickBold(boldButton) {
  boldButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isBoldSelected === false) {
      // make the text to bold
      activeCell.style.fontWeight = "600";
    } else {
      // make the text to normal
      activeCell.style.fontWeight = "400";
    }
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
  }
}

  // this function will be triggered when user clicks on the italic button.
function onClickItalic(italicButton) {
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isItalicSelected) {
      // the text already italic.
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }
    activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
  }
}

  // this function will be triggered when user clicks on the underline button.
function onClickUnderline(underlinedButton) {
  underlinedButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionsState.isUnderLineSelected) {
      // if the text is underlined => none
      activeCell.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
    }
    activeOptionsState.isUnderLineSelected =
      !activeOptionsState.isUnderLineSelected;
  }
}

// the below function task is to take the textAlign value and decides which alignment button needs to highlighted or not.
function highlightTextAlignButtons(textAlignValue) {
  for (let i = 0; i < textAlignElements.length; i++) {
    if (textAlignElements[i].getAttribute("data-value") === textAlignValue) {
      textAlignElements[i].classList.add("active-option");
    } else {
      textAlignElements[i].classList.remove("active-option");
    }
  }
}

 // this function will be triggered when user clicks on the text align buttons.
function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");
  highlightTextAlignButtons(selectedValue);

  // change the text alignment.
  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
}

 // this function will be triggered when user clicks on the text color button.
function onChangeTextColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.color = selectedColor;
    activeOptionsState.color = selectedColor;
  }
}

 // this function will be triggered when user clicks on the bg color button.
function onChangeBackgroundColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.backgroundColor = selectedColor;
    activeOptionsState.backgroundColor = selectedColor;
  }
}

addSheet.addEventListener("click", function(){
  let name = document.getElementsByClassName("sheetName");
  let x = document.createElement("span");
   x.classList.add("sheetName");
   let num = parseInt(name[name.length - 1].innerHTML.split(" ")[1]);
   num = num+1;
   x.innerHTML = "Sheet " + num;
   x.id="sheetName"+num;
   document.getElementById("footer").appendChild(x);

   let cellBody = document.getElementById("cellBody1");
   let clonedBody = cellBody.cloneNode(true);
  
   document.getElementById("mainContent").append(clonedBody);
   clonedBody.id = "cellbody" + num;

   activeSheet();
});

function activeSheet(){
  activeCell = null;
  document.querySelectorAll(".sheetName").forEach((ele) =>
  ele.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelectorAll(".sheetName").forEach((ele) => {
      ele.classList.remove("active");
     // document.querySelectorAll(".cellBody");
    });
    this.classList.add("active");
    let num = this.innerHTML.split(" ")[1];

    let cellBody = document.getElementsByClassName("cellBody");
    // for( let i=0;i<cellBody.length;i++){
    //   console.log(cellBody[i].id);
    //     cellBody[i].style.display="none";
    //     if(cellBody[i].id == "cellBody"+ num){
    //     }
    // }
    
    
  })
 ); 
}

