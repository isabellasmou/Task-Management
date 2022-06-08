const input = document.querySelector(".task-info-input");
const type = document.querySelector(".task-type-input");
const addTask = document.querySelector(".task-add");
const listValue = document.querySelector(".list-item-value");
const list = document.querySelector(".list-flex");
const listHdr = document.querySelector(".right-list-h3");
const verifyContainer = document.querySelector(".verify");
const verifyBtn = document.querySelectorAll(".verify-btn");
const verifyBtns = document.querySelector(".verify-btns");

let typeBC = ["#ffecb5", "#28a136", "#25becf", "#e2bbff", "#9d6fbf", "#5243de", "#b6ffee", "#ffb4c0", "#cf7d36", "#b8cf36"];
let typeCurrentC = [];
let slate = [];
let localData = localStorage.getItem("slate");
if (localData) {
  slate = JSON.parse(localStorage.getItem("slate"));
  if (slate.length == 0) {
    listHdr.innerHTML = "Adicone uma tarefa para começar";
  } else {
    maker();
    listHdr.innerHTML = "Tarefas semanais";
  }
}

addTask.addEventListener("click", addToList);
function addToList() {
  const inputType = type.value;
  const inputValue = input.value;
  const typeColor = typeBC[Math.floor(Math.random() * typeBC.length)];
  if (inputValue === "" || inputType === "") {
    return alert("enter value");
  }
  const obj = {
    value: inputValue,
    type: inputType,
    labelColor: typeColor,
  };
  const val = slate.length;
  slate.unshift(obj);
  input.value = "";
  type.value = "";
  createList(obj, val);
  input.focus();
  listHdr.innerHTML = "Próximas tarefas";
  maker();
  localStorage.setItem("slate", JSON.stringify(slate));
}
function maker() {
  list.innerHTML = "";
  slate.forEach((element, index) => {
    createList(element, index);
  });
}
function createList(el, indx) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("list-item");
  list.append(itemDiv);
  const valueDiv = document.createElement("div");

  valueDiv.classList.add("list-item-value");
  valueDiv.textContent = `${el.value}`;
  const typeDiv = document.createElement("div");
  typeDiv.style.backgroundColor = el.labelColor;
  typeDiv.classList.add("list-item-type");
  typeDiv.textContent = `${el.type}`;
  const removeDiv = document.createElement("div");
  removeDiv.classList.add("list-item-remove");
  removeDiv.innerHTML = `<img src="https://assets.codepen.io/2629920/delete.svg" />`;
  itemDiv.append(valueDiv);
  itemDiv.append(typeDiv);
  itemDiv.append(removeDiv);
  removeDiv.addEventListener("click", () => {
    itemDiv.style.backgroundColor = "#ffffff45";
    verifyContainer.style.display = "flex";
    verifyBtns.addEventListener("click", (e) => {
      const click = e.target.closest(".verify-btn");
      if (!click) return;
      const dataSet = click.dataset.delete;

      if (dataSet === "yes") {
        itemDiv.remove();
        slate.splice(indx, 1);
      } else {
        verifyContainer.style.display = "none";
      }
      if (slate.length === 0) {
        listHdr.innerHTML = "Adicione uma tarefa para começar";
      }
      verifyContainer.style.display = "none";
      itemDiv.style.backgroundColor = "var(--primary-dark)";
      localStorage.setItem("slate", JSON.stringify(slate));
    });
  });
  localStorage.setItem("slate", JSON.stringify(slate));
}
