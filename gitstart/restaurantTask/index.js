const ul = document.getElementById("item");

let table1 = document.getElementById("table1-list");
let table2 = document.getElementById("table2-list");
let table3 = document.getElementById("table3-list");

// !Event listeners
ul.addEventListener("click", removeItem);
window.addEventListener("DOMContentLoaded", fetchDetails);

// ! fetch details function
async function fetchDetails() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/dcb5a5b162434d1a869a6739f20feb05/restaurant"
    );
    console.log("get successful on load");
    response.data.forEach((user) => {
      showUserDetail(user);
    });
  } catch (error) {
    console.log(error);
  }
}

//! add data function
async function addData(event, obj) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";

  const li = document.createElement("li");
  li.textContent = amount + " @ " + description + " -> " + category;
  li.appendChild(deleteBtn);

  if (category === "Table 1") {
    table1.appendChild(li);
  } else if (category === "Table 2") {
    table2.appendChild(li);
  } else {
    table3.appendChild(li);
  }

  let myObj = {
    amount: amount,
    description: description,
    category: category,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/dcb5a5b162434d1a869a6739f20feb05/restaurant",
      myObj
    );
    li.id = response.data._id;
  } catch (error) {
    console.log(error);
  }
}

function showUserDetail(user) {
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";

  const li = document.createElement("li");
  li.textContent =
    user.amount + " @ " + user.description + " -> " + user.category;
  li.appendChild(deleteBtn);
  li.id = user._id;

  if (user.category === "Table 1") {
    table1.appendChild(li);
  } else if (user.category === "Table 2") {
    table2.appendChild(li);
  } else {
    table3.appendChild(li);
  }
}

async function removeItem(event) {
  if (event.target.classList.contains("delete")) {
    const li = event.target.parentElement;
    const liParent = li.parentElement;
    liParent.removeChild(li);

    const id = li.id;
    try {
      const response = await axios.delete(
        `https://crudcrud.com/api/dcb5a5b162434d1a869a6739f20feb05/restaurant/${id}`
      );
      console.log("delete successful", response);
    } catch (error) {
      console.log(error);
    }
  }
}
