const sqrt = "√";
const cubeRoot = "∛";
const fourRoot = "∜";
outsideProduct = [];
radicalIndex = 2;
insideProduct = [];
mode = "monsters";
level = 1;
selectMode = 0;
const largestMonster = 12;
levelSelectArea = document.getElementById("levelSelect");
gameArea = document.getElementById("gameArea");

function randomNumber(lowerBound, upperBound){
  let diff = upperBound - lowerBound;
  let randomNum = lowerBound + Math.floor(diff*Math.random());
  return randomNum;
}

function monsterfy(location,index) {
  document.getElementById("textBox").innerHTML = "";
  let newProduct = 1;
  let factors = [];
  let objectToSplice = index;
  if (location === 1) {
        newProduct = insideProduct[index].number;
       insideProduct.splice(objectToSplice,1);
  } else   if (location === 0) {
        newProduct = outsideProduct[index].number;
        outsideProduct.splice(objectToSplice,1);
  }
    let n = largestMonster;
    while (newProduct > largestMonster) {
      while(newProduct%n === 0) {
        newProduct = newProduct / n;
        factors.push(n);
      } 
      n--;
    }
    factors.push(newProduct);
  if (location === 1) {
   for(let i = 0; i < factors.length; i++) {
        let numberObject = {
          number: factors[i],
          selected: false,
          location: 1
        };
       if (numberObject.number > 1) {
        insideProduct.push(numberObject);
       }
     }
  } else   if (location === 0) {  
   for(let i = 0; i < factors.length; i++) {
        let numberObject = {
          number: factors[i],
          selected: false,
          location: 0
        };
       if (numberObject.number > 1) {
        outsideProduct.push(numberObject);
       }
     }
  } 
  return factors;
}

function massMonsterfy() {
  for (let i = 0; i < outsideProduct.length; i++) {
    if (outsideProduct[i].number > largestMonster) {
      monsterfy(0,i);
    }
  }
    for (let i = 0; i < insideProduct.length; i++) {
    if (insideProduct[i].number > largestMonster) {
      monsterfy(1,i);
    }
  }
}

function displayRadical() {
    let radicalText = "<table><tr>";
    let houseImageName = "radical";
    if (mode === "monsters") {
      houseImageName = "House";
      massMonsterfy();
    }
    
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
          outputText += '(' + productArray[i].number + ')';
        } else {
          // image for productArray[i].number goes here
          outputText +='<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
       
          outputText += productArray[i].number;
          outputText += '.png" width="27">';
        }
        outputText += " </button> ";       
  }
      return outputText;
    }
    radicalText += "<td>";
    radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
    radicalText += 'outsideSpacer';
    radicalText += '.png" width="64" height="65">';
  
    radicalText += displayProducts(outsideProduct);
    radicalText += "</td>";
  
    radicalText += "<td>";

  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + radicalIndex + 'a';
  radicalText += '.png" width="70"><br>';
/*
  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + radicalIndex + 'ab';
  radicalText += '.png" width="76"><br>'; 

  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + 2 + 'ac';
  radicalText += '.png" width="76">';    
  */
    radicalText += "</td>";
  
    radicalText += "<td>";
    for(let i = 0; i < insideProduct.length; i++) {
        radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
        radicalText += houseImageName + '2ba';
        radicalText += '.png" width="64">';
    }
    radicalText += "<br>";
  
    radicalText += displayProducts(insideProduct);
    radicalText += "<br>";
  

      for(let i = 0; i < insideProduct.length; i++) {
        radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
        radicalText += houseImageName + '2bc';
        radicalText += '.png" width="64">';
      }
    radicalText += "</td>";
  
    radicalText += "</tr></table>";
    document.getElementById("radical").innerHTML = radicalText;
}




function loadLevel(lvl){
  level = lvl;
  gameArea.style.display = "block";
  levelSelectArea.style.display = "none";  
  let radicalOutput = "";
  let numberOfOutsideProducts = 1;
  let numberOfInsideProducts = randomNumber(2,6);
  outsideProduct = [];
  insideProduct = [];
  if (level > largestMonster-1) {
    switchMode(0);
  }
  
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
    };
    if(newProduct > 1) {
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
        };
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
        };
        insideProduct.push(numberObject);
     }
  } else   if (selectMode === 0) {
    for(let i = 0; i < outsideProduct.length; i++) {
      if (outsideProduct[i].selected) {
        newProduct *= outsideProduct[i].number;
        objectsToSplice.push(i);
      }
    }
       for(let i = objectsToSplice.length-1; i > -1; i--){
         outsideProduct.splice(objectsToSplice[i],1);
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
          location: 0
        };
        outsideProduct.push(numberObject);
     }
  } 
  displayRadical();
}

function loadLevelSelectScreen() {
  let outputText = "<h2>Select a level<h2>";
  // outputText += '<button onclick="loadLevel(0)">Intro</button> ';
  for (let i = 1; i < 12; i++) {
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
    if (mode === "math") {
      if (outsideProduct.length > 1 || insideProduct.length > 1) {
        document.getElementById("textBox").innerHTML = "You are not done yet. Keep going!";
        return;
      }
    }
        level++;
        let outputText = "<h2>Good job!</h2><p>Now try level " + level + "</p>";
        document.getElementById("textBox").innerHTML = outputText;
        loadLevel(level);
    
  }
}

function switchMode(n) {
  let buttonText = "";
  if (n === 1 && level < largestMonster) {
    mode = "monsters";
    buttonText += '<button onclick="Multiply()">Combine</button> ';
    buttonText += '<button onclick="Factor()">Split</button> ';
    buttonText += '<button onclick="FactorOut()">Kick Out</button> ';
    buttonText += '<button onclick="Check()">Check</button> ';
    buttonText += '<button onclick="loadLevelSelectScreen()">Menu</button> ';
    buttonText += '<button onclick="switchMode(2)">Mode: Monsters</button>';  
  } else {
    mode = "math";
    buttonText += '<button onclick="Multiply()">Multiply</button> ';
    buttonText += '<button onclick="Factor()">Factor</button> ';
    buttonText += '<button onclick="FactorOut()">Factor Out</button> ';
    buttonText += '<button onclick="Check()">Check</button> ';
    buttonText += '<button onclick="loadLevelSelectScreen()">Menu</button> ';
    buttonText += '<button onclick="switchMode(1)">Mode: Math</button>';  
  }
  document.getElementById('buttons').innerHTML = buttonText;
  displayRadical();
}





loadLevelSelectScreen();

