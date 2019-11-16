const sqrt = "√";
const cubeRoot = "∛";
const fourRoot = "∜";
outsideProduct = [];
radicalIndex = 2;
insideProduct = [];
mode = "math";
level = 1;
selectMode = 0;
levelSelectArea = document.getElementById("levelSelect");
gameArea = document.getElementById("gameArea");

function randomNumber(lowerBound, upperBound){
  let diff = upperBound - lowerBound;
  let randomNum = lowerBound + Math.floor(diff*Math.random());
  return randomNum;
}

function displayRadical() {
    let radicalText = "";
    function displayProducts(productArray) {
      let outputText = "";
      for (let i = 0; i < productArray.length; i++) {
         outputText += "<button ";
      if (productArray[i].selected === true) {
          outputText += 'class ="selected"';
      } else {
          outputText += 'class ="notSelected"';
      }
        outputText += 'onclick="selectNumber('; 
        outputText += productArray[i].location + ', ' + i + ')"';
        outputText += "> ";
        if (mode === "math"){
          outputText += productArray[i].number;
        } else {
          // image for productArray[i].number goes here
          outputText +='<img src="';
          outputText += productArray[i].number;
          outputText += '">';
        }
        outputText += " </button> ";       
  }
      return outputText;
    }
    radicalText += displayProducts(outsideProduct);
    switch(radicalIndex) {
        case 2:
          radicalText += sqrt;
          break;
        case 3:
          radicalText += cubeRoot;
          break;
        case 4:
          radicalText += fourRoot;
          break;
        default:
          radicalText += sqrt;
    }
    radicalText += displayProducts(insideProduct);
  document.getElementById("radical").innerHTML = radicalText;
}

function loadLevel(lvl){
  level = lvl;
  gameArea.style.display = "block";
  levelSelectArea.style.display = "none";  
  let radicalOutput = "";
  let numberOfOutsideProducts = 1;
  let numberOfInsideProducts = randomNumber(2,level+1);
  outsideProduct = [];
  insideProduct = [];
  
  for(let i = 0; i < numberOfOutsideProducts; i++) {
    let numberObject = {
      number: randomNumber(2,level+1),
      selected: false,
      location: 0
    };
    outsideProduct.push(numberObject);
  }
  if(level < 10) {
    radicalIndex = 2;
  } else {
    radicalIndex = randomNumber(2,4);
  }
   for(let i = 0; i < numberOfInsideProducts; i++) {
     let numberObject = {
       number: randomNumber(2, level+1),
       selected: false,
       location: 1
     };
     insideProduct.push(numberObject);
   }
   displayRadical();
}


function selectNumber(location, index) {
  if (location === 0) {
    if (outsideProduct[index].selected) {
      outsideProduct[index].selected = false;
    } else {
      outsideProduct[index].selected = true;
    }
    for (let i = 0; i < insideProduct.length; i++) {
      insideProduct[i].selected = false;
    }
    selectMode = 0;
  } else if (location === 1) {
    if (insideProduct[index].selected === true) {
      insideProduct[index].selected = false;
    } else if (insideProduct[index].selected === false) {
      insideProduct[index].selected = true;
    }
    for (let i = 0; i < outsideProduct.length; i++) {
      outsideProduct[i].selected = false;
    }
    selectMode = 1;
  }
    displayRadical();
}

function Multiply() {
  document.getElementById("textBox").innerHTML = "";
  let numbersToMultiply = [];
  let objectsToSplice = [];
  if (selectMode === 0) {
    for(let i = 0; i < outsideProduct.length; i++) {
      if (outsideProduct[i].selected) {
        numbersToMultiply.push(outsideProduct[i].number);
        objectsToSplice.push(i);
      }
    }
    for(let i = objectsToSplice.length-1; i > -1; i--){
      outsideProduct.splice(objectsToSplice[i],1);
    }
    let newProduct = 1;
    for (let i = 0; i < numbersToMultiply.length; i++) {
      newProduct *= numbersToMultiply[i];
    }
    let numberObject = {
      number: newProduct,
      selected: false,
      location: 0
    }
    if (newProduct > 1) {
      outsideProduct.push(numberObject);
    }
  } else {
       for(let i = 0; i < insideProduct.length; i++) {
      if (insideProduct[i].selected) {
        numbersToMultiply.push(insideProduct[i].number);
        objectsToSplice.push(i);
      }
    }
    for(let i = objectsToSplice.length-1; i > -1; i--){
      insideProduct.splice(objectsToSplice[i],1);
    }
    let newProduct = 1;
    for (let i = 0; i < numbersToMultiply.length; i++) {
      newProduct *= numbersToMultiply[i];
    }
    let numberObject = {
      number: newProduct,
      selected: false,
      location: 1
    }
    if (newProduct > 1) {
      insideProduct.push(numberObject);
    } 
  }
  displayRadical();
  return numbersToMultiply;
}

function FactorOut() {
  document.getElementById("textBox").innerHTML = "";
  let newProduct = 1;
  let newSquareRoot = 1;
  let objectsToSplice = [];
  if (selectMode === 1) {
    for(let i = 0; i < insideProduct.length; i++) {
      if (insideProduct[i].selected) {
        newProduct *= insideProduct[i].number;
        objectsToSplice.push(i);
      }
    }
    switch(radicalIndex) {
      case 2:
        newSquareRoot = Math.sqrt(newProduct); 
        break;
      case 3:
        newSquareRoot = Math.cbrt(newProduct); 
        break;
       case 4:
        newSquareRoot = Math.sqrt(Math.sqrt(newProduct)); 
        break;
    }
    if(Number.isInteger(newSquareRoot)) {
       for(let i = objectsToSplice.length-1; i > -1; i--){
         insideProduct.splice(objectsToSplice[i],1);
       }
   
        let numberObject = {
          number: newSquareRoot,
          selected: false,
          location: 0
        }
        if (newSquareRoot > 1) {
          outsideProduct.push(numberObject);
         } 
     } else {
    let errorMessage = "Error! ";
    if (mode === "math") {
      errorMessage += "Product is not a perfect ";
      switch(radicalIndex){
        case 2:
          errorMessage += "square";
          break;
        case 3:
          errorMessage += "cube";
          break;
        case 4:
          errorMessage += "fourth";
          break;
      }
      errorMessage += ". Cannot be factored out.";
    } else if (mode === "monsters") {
      errorMessage += "Monsters do not match up correctly. Cannot be taken out."; 
    }
    document.getElementById("textBox").innerHTML = errorMessage;
  }
    }  else {
    let errorMessage = "Please select ";
    if (mode === "math") {
      errorMessage += "numbers from inside the radical.";
    } else if (mode === "monsters") {
      errorMessage += "monsters from inside the house."; 
    }
    document.getElementById("textBox").innerHTML = errorMessage;
  }  
  displayRadical();
  }

function Factor() {
  document.getElementById("textBox").innerHTML = "";
  let newProduct = 1;
  let factors = [];
  let objectsToSplice = [];
  if (selectMode === 1) {
    for(let i = 0; i < insideProduct.length; i++) {
      if (insideProduct[i].selected) {
        newProduct *= insideProduct[i].number;
        objectsToSplice.push(i);
      }
    }
       for(let i = objectsToSplice.length-1; i > -1; i--){
         insideProduct.splice(objectsToSplice[i],1);
       }
    let n = 2;
    while (newProduct > 1) {
      while(newProduct%n === 0) {
        newProduct = newProduct / n;
        factors.push(n);
      }
      n++;
    }
   for(let i = 0; i < factors.length; i++) {
        let numberObject = {
          number: factors[i],
          selected: false,
          location: 1
        }
        insideProduct.push(numberObject);
     }
  }
  displayRadical();
}

function loadLevelSelectScreen() {
  let outputText = "<h2>Select a level<h2>";
  // outputText += '<button onclick="loadLevel(0)">Intro</button> ';
  for (let i = 1; i < 10; i++) {
    outputText += ' <button onclick="loadLevel(' + i + ')"> ' + i + ' </button> ';
  }
  levelSelectArea.innerHTML = outputText;
  levelSelectArea.style.display = "block";
  gameArea.style.display = "none";  
}




function isDivisibleByPower(n,index) {
  let i = 1;
  let iRaised = Math.pow(i,index);
  while(n >= iRaised) {
    i++;
    iRaised = Math.pow(i,index);
    if (n % iRaised === 0) {
      return true;
    }

  }
  return false;
}

function productJSON(JSONarray) {
  let product = 1;
  for(let i = 0; i < JSONarray.length; i++) {
    product *= JSONarray[i].number;
  }
  return product;
}

function Check() {
  let numberToCheck = productJSON(insideProduct);
  if (isDivisibleByPower(numberToCheck,radicalIndex) === true) {
    document.getElementById("textBox").innerHTML = "You are not done yet. Keep going!";
  } else {
        level++;
        let outputText = "<h2>Good job!</h2><p>Now try level " + level + "</p>";
        document.getElementById("textBox").innerHTML = outputText;
        loadLevel(level);
    
  }
}


loadLevelSelectScreen();

