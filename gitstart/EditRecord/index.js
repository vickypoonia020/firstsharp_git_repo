var ul=document.getElementById('item')
ul.addEventListener('click',removeItem)
ul.addEventListener('click',editItem)
function addData(event){
    event.preventDefault()
    var amount=document.getElementById('amount').value 
    var description=document.getElementById('description').value 
    var category=document.getElementById('category').value 

    var li=document.createElement('li');
    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    editBtn.className='edit-btn';
    deleteBtn.className = 'li_btn';
   
    deleteBtn.appendChild(document.createTextNode('Delete'))
    editBtn.appendChild(document.createTextNode('Edit'))
    li.appendChild(document.createTextNode(amount+' '+description+' '+category))
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    
    let myObj ={
        amount:amount,
        description:description ,
        category:category  
    }
    let myObj_serialized=JSON.stringify(myObj);
    localStorage.setItem(myObj.category,myObj_serialized)

}
function removeItem(event){
    if(event.target.classList.contains('li_btn')){
        var li = event.target.parentElement;
        ul.removeChild(li)

    var amount=document.getElementById('amount').value 
    var description=document.getElementById('description').value 
    var category=document.getElementById('category').value 
    let myObj ={
        amount:amount,
        description:description ,
        category:category  
    }
    let myObj_serialized=JSON.stringify(myObj);
    localStorage.removeItem(myObj.category,myObj_serialized)

    }

}
function editItem(event){
    if(event.target.classList.contains('edit-btn')){
        let li=event.target.parentElement;
        let data=li.textContent
        data=data.split(' ')
        amount=data[0]
        description=data[1]
        category=data[2]
        ul.removeChild(li)


        var amount=document.getElementById('amount').value 
        var description=document.getElementById('description').value 
        var category=document.getElementById('category').value 
        let myObj ={
            amount:amount,
            description:description ,
            category:category  
        }
        let myObj_serialized=JSON.stringify(myObj);
        localStorage.removeItem(myObj.category,myObj_serialized)
    
        }
    }
