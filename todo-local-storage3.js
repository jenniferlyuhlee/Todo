//selecting all necessary elements and inputs
const form = document.querySelector('#addTodo');
const myList = document.querySelector('#myList');
const todoInput = document.querySelector('#task');


//get the old TODOs, or an empty array if there are no old TODOs
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
    //restore checkbox 
    const checkbox = document.createElement('input');
    checkbox.name = 'checkbox';
    checkbox.type = 'checkbox';
    //restore label (from the user input)
    const newTodo = document.createElement('label');
    newTodo.innerText = savedTodos[i].task; 
    newTodo.prepend(checkbox);
    newTodo.isCompleted =  savedTodos[i].isCompleted ? true : false;
    //restore div with entire checkbox and label
    const newDiv = document.createElement('div');
    newDiv.append(newTodo);
    newDiv.classList.add('space-between');
    //checks completion status and restores strikethrough
    if (newTodo.isCompleted) {
        checkbox.checked = true;
        newTodo.style.textDecoration = "line-through";
      }
    //appends to list
    myList.append(newDiv);
}



//Adds new to-do, checkbox and remove button when form submitted
form.addEventListener('submit', function(event){
    event.preventDefault();
    //new checkbox 
    const checkbox = document.createElement('input');
    checkbox.name = 'checkbox';
    checkbox.type = 'checkbox';
    //new label (from the user input)
    const newTodo = document.createElement('label');
    newTodo.innerText = todoInput.value;
    newTodo.prepend(checkbox);
    //create div with entire checkbox and label
    const newDiv = document.createElement('div');
    newDiv.append(newTodo);
    newDiv.classList.add('space-between');
    //append to list
    myList.append(newDiv);
    //reset form
    todoInput.value='';

    // add the TODO to the array you got in step one
    savedTodos.push({task: newTodo.innerText, isCompleted: false });
    // resave it back in localStorage
    localStorage.setItem("todos", JSON.stringify(savedTodos));

})

    //strikethrough class added when checkbox or label clicked and updated in localStorage
    myList.addEventListener('click', function(e){
        let clickedItem = e.target;
        if (clickedItem.tagName === "INPUT" && !clickedItem.parentElement.isCompleted){
            console.log(clickedItem);
            clickedItem.checked;
            clickedItem.parentElement.style.textDecoration = "line-through";
            clickedItem.parentElement.isCompleted = true;
        }        
        else if(clickedItem.tagName === "INPUT" && clickedItem.parentElement.isCompleted){
            clickedItem.parentElement.style.textDecoration = "none";
            clickedItem.parentElement.isCompleted = false;
        }  
    })

