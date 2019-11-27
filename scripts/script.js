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
textArea = document.getElementById("textBox");
buttonArea = document.getElementById("buttons");
radicalArea = document.getElementById('radical');

monsters = [
  { number: 0,
    name: "Rezo",
    combine: [],
    primary: false
  },
  {
    number: 1,
    name: "Juan",
    combine: [],
    primary: false
  },
    {
    number: 2,
    name: "Tootsy",
    combine: [],
    primary: true
  },
    {
    number: 3,
    name: "Seether",
    combine: [],
    primary: true
  },
   {
    number: 4,
    name: "Ford",
    combine: [[2,2]],
    primary: false
  },
  {
    number: 5,
    name: "Vife",
    combine: [],
    primary: true
  },
  {
    number: 6,
    name: "Snix",
    combine: [[2,3]],
    primary: false
  },
    {
    number: 7,
    name: "Sven",
    combine: [],
    primary: true
  },
  {
    number: 8,
    name: "Tate",
    combine: [[2,2,2],[4,2]],
    primary: false
  },
  {
    number: 9,
    name: "Neener",
    combine: [[3,3]],
    primary: false
  },
  {
    number: 10,
    name: "Tne",
    combine: [[2,5]],
    primary: false
  },
      {
    number: 11,
    name: "Elvan",
    combine: [],
    primary: true
  },
  {
    number: 12,
    name: "Welf",
    combine: [[2,2,3],[2,6],[3,4]],
    primary: false
  },
]

function randomNumber(lowerBound, upperBound){
  let diff = upperBound - lowerBound + 1;
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
    let radicalText = "<div class='flex-container' width=100%>";
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
    radicalText += "<div id='outsideHouse'  class='column outside'>";
      radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
      radicalText += 'outsideSpacer';
      radicalText += '.png" width="64" height="65">';
  
      radicalText += displayProducts(outsideProduct);
    radicalText += "</div>";
  
  radicalText += "<div id='leftSideHouse'  class='column middle'>";

  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + radicalIndex + 'a';
  radicalText += '.png" height="109" class="column image top"><br>';
/*
  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + radicalIndex + 'ab';
  radicalText += '.png" width="76"><br>'; 

  radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
  radicalText += houseImageName + 2 + 'ac';
  radicalText += '.png" width="76">';    
  */
    radicalText += "</div>";
  
    radicalText += "<div id='insideHouse'  class='column inside'>";
    //for(let i = 0; i < insideProduct.length; i++) {
        radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
        radicalText += houseImageName + '2ba';
        radicalText += '.png" height="38" class="column image top">';
    //}
    radicalText += "<br>";
  
    radicalText += displayProducts(insideProduct);
    if (insideProduct.length === 0) {
    radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
    radicalText += 'outsideSpacer';
    radicalText += '.png" width="1" height="48">';
   }
    radicalText += "<br>";
  

     // for(let i = 0; i < 8; i++) {
        radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
        radicalText += houseImageName + '2bc';
        radicalText += '.png" height="8" class="column image bottom">';
     // }
    radicalText += "</div>";
    if (mode === "monsters") {
      radicalText += "<div id='rightSideHouse' class='column right'>";
        radicalText += '<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
        radicalText += houseImageName + 2 + 'c';
        radicalText += '.png" height="109" class="column image top">';
      radicalText += "</div>";
    }
  
    radicalText += "</div>";
    document.getElementById("radical").innerHTML = radicalText;
}


function tutorial(tutorialNumber, screenNumber) {
  let outputText = "";
  let tutorialStrings2 = [
    "Hello, my name is Tootsy. I live at 2 Radical Street.",
    "It does not have a house number, but that is okay. ",
    "Everyone knows it is 2 Radical Street. <br>It is the only house on the street without a house number. ",
    "The monsters here on Radical Street like to have parties. ",
    "When the party is over at my house, I have to kick monsters out two at a time. ",
    "They also have to be the same type of monster. ",
    "When they leave, they combine to become one monster! ",
    "If there is not a monster of the same type, they have to stay in the house. ",
    "Some monsters can be split into other monsters or be combined to form new monsters. ",
    "Monsters that cannot be split are called Primary Monsters. ",
    "Sometimes they can leave on their own if can be split into two of the same type of monster. ",
    "To kick out monsters, click the monsters you want to kick out and then click kick out. ",
    "To split monsters, click the monster you want to split and then click Split. ",
    "To combine monsters, click the monsters you want to combine and click Combine. "
  ];
    let tutorialStrings3 = [
    "Welcome to 3 Radical Street. My name is Tate. ",
    "At 3 Radical Street, you need 3 monsters of the same type to kick them out of the house. ",
    "I can be made by combining 3 Tootsy or a Tootsy and a Ford. "
  ];
      let tutorialStrings4 = [
    "Welcom to 4 Radical Street. My name is Sven.",
    "At 4 Radical Street, you need 4 monsters of the same type to kick them out of the house. ",
    "Also, I am a primary monster. Like Tootsy, Vife, and Seether, I cannont be split anymore. "
  ];
  switch (tutorialNumber) {
    case 2:
    outputText += '<table><tr><td>';
      outputText +='<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
      outputText += 2;
      outputText += '.png" width="64">';
    outputText += '</td>';
    outputText += '<td>';
      switch (screenNumber) {
        case 1:
          for(let i = 0; i < 3; i++) {
            outputText += tutorialStrings2[i] + '<br>';        
          }
          outputText += '<button onclick="tutorial(2,2)">Continue</button>';
          break;
         case 2:
          for(let i = 3; i < 7; i++) {
            outputText += tutorialStrings2[i] + '<br>';        
          }
          outputText += '<button onclick="tutorial(2,3)">Continue</button>';
          break;
        case 3:
          for(let i = 7; i < 11; i++) {
            outputText += tutorialStrings2[i] + '<br>';        
          }
          outputText += '<button onclick="tutorial(2,4)">Continue</button>';
          break;
        case 4:
          for(let i = 11; i < 14; i++) {
            outputText += tutorialStrings2[i] + '<br>';        
          }
          //outputText += '<button onclick="tutorial(2,3)">Continue</button>';
          break;
      }
    outputText += '</td></tr></table>';
    break; 
  case 3:
    outputText += '<table><tr><td>';
      outputText +='<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
      outputText += 8;
      outputText += '.png" width="64">';
    outputText += '</td>';
    outputText += '<td>';
      switch (screenNumber) {
        case 1:
          for(let i = 0; i < 3; i++) {
            outputText += tutorialStrings3[i] + '<br>';        
          }
          //outputText += '<button onclick="tutorial(2,2)">Continue</button>';
          break;
      }
    outputText += '</td></tr></table>';
    break; 
  case 4:
    outputText += '<table><tr><td>';
      outputText +='<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
      outputText += 7;
      outputText += '.png" width="64">';
    outputText += '</td>';
    outputText += '<td>';
      switch (screenNumber) {
        case 1:
          for(let i = 0; i < 3; i++) {
            outputText += tutorialStrings4[i] + '<br>';        
          }
          //outputText += '<button onclick="tutorial(2,2)">Continue</button>';
          break;
      }
    outputText += '</td></tr></table>';
    break;  
  }
  textArea.innerHTML = outputText;
  return outputText;
}

function loadLevel(lvl){
  let outputText = "";
  level = lvl;
  gameArea.style.display = "block";
  levelSelectArea.style.display = "none";  
  let radicalOutput = "";
  let numberOfOutsideProducts = 1;
  let monsterNumber = 2;
  let numberOfInsideProducts = randomNumber(2,5);
  let numberObject = {
    number: 2,
    selected: false,
    location: 0
  };
  outsideProduct = [];
  insideProduct = [];
  if (level > largestMonster-1) {
    switchMode(0);
    radicalIndex = randomNumber(2,3);
    
    for(let i = 0; i < numberOfOutsideProducts; i++) {
      numberObject = {
        number: randomNumber(2,level+1),
        selected: false,
        location: 0
      };
      outsideProduct.push(numberObject);
    }
    
    for(let i = 0; i < numberOfInsideProducts; i++) {
      numberObject = {
        number: randomNumber(2, level+1),
        selected: false,
        location: 1
      };
     insideProduct.push(numberObject);
   }  
  } else {
 
    if (mode === 'monsters') {
        outputText +='<table><tr><td>';
          outputText +='<img src="https://raw.githubusercontent.com/mrgeyer/radical-street/master/images/';
          outputText += lvl+1;
          outputText += '.png" width="64">';
        outputText += '</td>';
        outputText += '<td>';
           outputText += 'Hello, I am ' + monsters[lvl+1].name + ". ";
           if (monsters[lvl+1].primary) {
              outputText += "I am a primary monster. I cannot be split anymore.";
           } else {
             outputText += "I can be made by combining ";
             for (let i = 0;  i < monsters[lvl+1].combine.length; i++) {
               for (let j = 0; j < monsters[lvl+1].combine[i].length; j++) {
                 monsterNumber = monsters[lvl+1].combine[i][j];
                 outputText += monsters[monsterNumber].name;
                 if (j <= monsters[lvl+1].combine[i].length - 2) {
                   if(monsters[lvl+1].combine[i].length > 2) {
                     outputText += ",";
                   }
                   outputText += " ";
                 }
                 if(j === monsters[lvl+1].combine[i].length - 2) {
                   outputText += "and ";
                 }
               }
               if (monsters[lvl+1].combine.length > 1 && i < monsters[lvl+1].combine.length - 1) {
                 outputText += " or ";
               }
             }
           }   
        outputText += '</td></tr></table>';
    }
    
        numberObject = {
          number: lvl+1,
          selected: false,
          location: 0
        };
        outsideProduct.push(numberObject);
        numberObject = {
          number: lvl+1,
          selected: false,
          location: 1
        };
        insideProduct.push(numberObject);
        for(let i = 1; i < numberOfInsideProducts; i++)  {
          numberObject = {
            number: randomNumber(2,lvl+1),
            selected: false,
            location: 1
          };
          insideProduct.push(numberObject);
        }
      if (level < 7) {
        radicalIndex = 2;
      } else if (level > 6) {
        radicalIndex = randomNumber(2,3);
      } 
      /*
      else if( level > 6) {
        radicalIndex = randomNumber(2,4);
      }
      */
    }
    displayRadical();
    textArea.innerHTML = outputText;
    if (level === 1) {
      tutorial(2,1);
    }
    if (level === 7) {
      tutorial(3,1);
      radicalIndex = 3;
      displayRadical();
    }
    /*
    if (level === 6) {
      tutorial(4,1);
      radicalIndex = 4;
      displayRadical();
    }
    */
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
  let maxLevel = largestMonster-1;
  if (mode === "math") {
    if (level > 11){
     maxLevel = level;     
    }

  }
  for (let i = 1; i < maxLevel+1; i++) {
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
        let nextLevel = level + 1;
        let outputText = "<h2>Good job!</h2><p><button onclick='loadLevel("+ nextLevel + ")'>Click here to try level " + nextLevel + "</button></p>";
        document.getElementById("textBox").innerHTML = outputText;
        //loadLevel(level);
    
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

