var ul = document.getElementById("item");
ul.addEventListener("click", removeItem);
ul.addEventListener("click", editData);
function addData(event) {
  event.preventDefault();

  var userName = document.getElementById("name").value;
  var userEmail = document.getElementById("email").value;
  var userPhone = document.getElementById("phone").value;

  var li = document.createElement("li");
  li.className = "l_items";
  li.appendChild(
    document.createTextNode(userName + "--" + userEmail + "--" + userPhone)
  );

  var deleteBtn = document.createElement("button");
  var editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  deleteBtn.className = "li_btn";
  deleteBtn.appendChild(document.createTextNode("delete"));
  editBtn.appendChild(document.createTextNode("edit"));
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  ul.appendChild(li);

  let myObj = {
    name: userName,
    email: userEmail,
    phone: userPhone,
  };
  // post
  axios
    .post(
      "https://crudcrud.com/api/9d5bf1646948481294bdece074925249/appoitmentdata",
      myObj
    )
    .then((response) => {
      console.log(response);
      showUserDetail(response.data);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong</h4>";
      console.log(err);
    });
  // get
  axios
    .get(
      "https://crudcrud.com/api/9d5bf1646948481294bdece074925249/appoitmentdata"
    )
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        showUserDetail(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  function showUserDetail(user) {
    var userName = document.getElementById("name").value;
    var userEmail = document.getElementById("email").value;
    var userPhone = document.getElementById("phone").value;

    var li = document.createElement("li");
    li.className = "l_items";
    li.appendChild(
      document.createTextNode(
        user.name +
          "--" +
          user.email +
          "--" +
          user.phone +
          "--" +
          user._id +
          "--"
      )
    );

    var deleteBtn = document.createElement("button");
    var editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    deleteBtn.className = "li_btn";
    deleteBtn.appendChild(document.createTextNode("delete"));
    editBtn.appendChild(document.createTextNode("edit"));
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  }
  showUserDetail();
  // let myObj_serialized=JSON.stringify(myObj);
  // localStorage.setItem(myObj.email,myObj_serialized)

  // localStorage.setItem('Name',myObj.name)
  // localStorage.setItem('Email',myObj.email)
}

// Remove item
function removeItem(event) {
  if (event.target.classList.contains("li_btn")) {
    var li = event.target.parentElement;
    var data = li.textContent;
    data = data.split("--");
    var id = data[3];
    axios
      .delete(
        `https://crudcrud.com/api/9d5bf1646948481294bdece074925249/appoitmentdata/${id}`
      )
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          showUserDetail(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    ul.removeChild(li);
    // var userName=document.getElementById('name').value;
    // var userEmail=document.getElementById('email').value;
    // var userPhone=document.getElementById('phone').value;
    // let myObj ={
    //     name:userName,
    //     email:userEmail ,
    //     phone:userPhone
    // }
    // let myObj_serialized=JSON.stringify(myObj);
    // localStorage.removeItem(myObj.email,myObj_serialized)
  }
}
function editData(event) {
  if (event.target.classList.contains("edit-btn")) {
    let li = event.target.parentElement;
    let data = li.textContent;
    data = data.split("--");
    myName.value = data[0];
    myEmail.value = data[1];
    phone.value = data[2];
    const id = data[3];

    let obj1 = {
      name: myName.value,
      email: myEmail.value,
      phone: phone.value,
    };

    axios
      .put(
        `https://crudcrud.com/api/9d5bf1646948481294bdece074925249/appoitmentdata/${id}`,
        obj1
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      })
      .then(
        axios
          .get(
            `https://crudcrud.com/api/9d5bf1646948481294bdece074925249/appoitmentdata/${id}`
          )
          .then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
              showUserDetail(response.data[i]);
            }
          })
          .catch((e) => {
            console.log(e);
          })
      );

    ul.removeChild(li);
  }
}
