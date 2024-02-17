//selecting all necessary elements and inputs
const form = document.querySelector('#addTodo');
const myList = document.querySelector('#myList');
const todoInput = document.querySelector('#task');


//get the old TODOs and display on page, or an empty array if there are no old TODOs
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
    //restore checkbox 
    const checkbox = document.createElement('input');
    checkbox.name = 'checkbox';
    checkbox.type = 'checkbox';
    //restore label (from the user input)
    const newTodo = document.createElement('label');
    newTodo.innerText = savedTodos[i].task; 
    newTodo.isCompleted =  savedTodos[i].isCompleted ? true : false;
    newTodo.prepend(checkbox);
    //restore remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('spacing');
    //restore div with entire checkbox and label
    const newDiv = document.createElement('div');
    newDiv.append(newTodo);
    newDiv.append(removeBtn);
    newDiv.classList.add('space-between');
    //checks completion status and restores strikethrough
    if (newTodo.isCompleted) {
        checkbox.checked = true;
        newTodo.style.textDecoration = "line-through";
      }
    //appends to list
    myList.append(newDiv);
}

//Adds new to-do and checkbox when form submitted
form.addEventListener('submit', function(event){
    event.preventDefault();
    //new checkbox 
    const checkbox = document.createElement('input');
    checkbox.name = 'checkbox';
    checkbox.type = 'checkbox';
    //new label (from the user input)
    const newTodo = document.createElement('label');
    newTodo.innerText = todoInput.value;
    newTodo.isCompleted=false;
    newTodo.prepend(checkbox);
    //new remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('spacing');
    //create div with entire checkbox and label
    const newDiv = document.createElement('div');
    newDiv.append(newTodo);
    newDiv.append(removeBtn);
    newDiv.classList.add('space-between');
    //append to list
    myList.append(newDiv);
    //reset form
    todoInput.value='';

    // add the TODO to the array from step one
    savedTodos.push({task: newTodo.innerText, isCompleted: false });
    // resave it back in localStorage
    localStorage.setItem("todos", JSON.stringify(savedTodos));
});

/*
For click event listener below, help received from on-demand mentor Peter Nsaka
*/

myList.addEventListener('click', function(e){
    let clickedItem = e.target;  
    //strikethrough class added when checkbox or label clicked and updated in localStorage
    if (clickedItem.tagName === "INPUT"){
        //find the correct corresponding todo object and its index based on the clicked task's text content (label)
        let todoText = clickedItem.parentElement.innerText;
        let todoIndex = savedTodos.findIndex(function(todo){
            return todo.task === todoText;
        });
        //check if the todo was found
        if (todoIndex !== -1){
            //update status completion of todo object
            savedTodos[todoIndex].isCompleted = clickedItem.checked;
        }
        //Update the display based on the current completion state
        if(clickedItem.checked){
            clickedItem.parentElement.style.textDecoration = "line-through";
        }        
        else{
            clickedItem.parentElement.style.textDecoration = "none";
        }  
        //resave the updated todos array into localStorage
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    } 
    //removes tasks from display and localStorage when remove button clicked
    else if (clickedItem.tagName === "BUTTON"){
        let todoText = clickedItem.previousSibling.innerText;
        let todoIndex = savedTodos.findIndex(function(todo){
            return todo.task === todoText;
        });
        if (todoIndex !== -1){
            savedTodos.splice(todoIndex, 1);
        }
        localStorage.setItem("todos", JSON.stringify(savedTodos));
        e.target.parentElement.remove();
    }

 });


/*original starting code*/
        // let clickedItem = e.target;
        // if (clickedItem.tagName === "INPUT" && !clickedItem.parentElement.isCompleted){
        //     // console.log(clickedItem);
        //     clickedItem.parentElement.style.textDecoration = "line-through";
        //     clickedItem.parentElement.isCompleted = true;
        // }        
        // else if(clickedItem.tagName === "INPUT" && clickedItem.parentElement.isCompleted){
        //     clickedItem.parentElement.style.textDecoration = "none";
        //     clickedItem.parentElement.isCompleted = false;
        // }  


