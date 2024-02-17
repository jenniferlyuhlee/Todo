//selecting all necessary elements and inputs
const form = document.querySelector('#addTodo');
const myList = document.querySelector('#myList');
const todoInput = document.querySelector('#task');

//Adds new to-do, checkbox and remove button when form submitted
form.addEventListener('submit', function(event){
    event.preventDefault();
    //new checkbox 
    const checkbox = document.createElement('input');
    checkbox.name = 'checkbox';
    checkbox.type = 'checkbox';
    //new label (from the user input)
    let newTodo = document.createElement('label');
    newTodo.innerText = todoInput.value;
    newTodo.prepend(checkbox);
    //new remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.classList.add('spacing');
    //new div with entire checkbox, label and remove button
    const newDiv = document.createElement('div');
    newDiv.append(newTodo);
    newDiv.append(removeBtn);
    newDiv.classList.add('space-between');
    myList.append(newDiv);
    //reset form
    todoInput.value='';
    //strikethrough class added when checkbox or label clicked
    checkbox.addEventListener('click', function(e){
        if (checkbox.checked){
            newTodo.style.textDecoration = "line-through";
        }        
        else {
            newTodo.style.textDecoration = "none";
        }
    })
})

//Removes tasks when remove button is clicked
myList.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON'){
        event.target.parentElement.remove();
    }
})

