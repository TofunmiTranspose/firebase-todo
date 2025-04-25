import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://real-time-database-5442c-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputElem = document.querySelector('#input-field');
const shoppingList  = document.querySelector('.shopping-list');

document.querySelector('.click').addEventListener('click', ()=> {
  let inputValue = inputElem.value;

  if(inputValue !== ''){
   push(shoppingListInDB, inputValue);

  clearInput(); 
  }
});

onValue(shoppingListInDB, (snapshot)=>{
  if (snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for(let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemvalue = currentItem[1];

      renderList(currentItem);
    };
  } else {
    shoppingList.innerHTML = 'No items here... yet'
  };  
});

function clearInput() {
  inputElem.value = ''
};

function renderList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  //shoppingList.innerHTML += `<li>${inputValue}</li>`;

  let newEl = document.createElement('li');
  newEl.textContent = itemValue;

  newEl.addEventListener('click', () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  })

  shoppingList.append(newEl);
};
function clearShoppingListEl(){
  shoppingList.innerHTML = ""
};