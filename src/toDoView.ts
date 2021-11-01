 import {modelObject} from "./todoModel";
 import {controlerObject} from "./index"
 
 
 class TodoView {
  form;
  template;
  removeAll;
  constructor() {
    
    this.form = <HTMLFormElement>document.querySelector("#todoForm");
    this.template = <HTMLDivElement>document.querySelector("#todoItems");
    this.removeAll = <HTMLFormElement>document.querySelector("#todoForm");
  }
  setEvents() {
    window.addEventListener("load", viewObject.onLoadFunc);
    this.form.addEventListener("submit", viewObject.formSubmit);
    this.template.addEventListener("change", viewObject.checkBoxFunc);
    this.template.addEventListener("click", viewObject.deletElemFunc);
    this.removeAll.addEventListener("click", viewObject.deletAllFunc);
  }
  formSubmit(e:any) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input, textarea");

    for (const input of inputs) {
      if (!input.value.length) return alert("No way you can add this shit");
    }
    controlerObject.setData(inputs);
    const todoItemObject =
    controlerObject.getData()[controlerObject.getData().length - 1];
    viewObject.renderItem(todoItemObject);
    e.target.reset();
  }
  onLoadFunc() {
    if (!localStorage.getItem("saved_data")) return false;
    modelObject.countOfIcons=0;
    controlerObject.getData().forEach((item:any) => viewObject.renderItem(item));
  }
  checkBoxFunc(boxCheck:any) {
    controlerObject.makeCheckBox(boxCheck);
    // console.log(setEvent.template);
    viewObject.template.textContent = "";
    viewObject.onLoadFunc();
  }
  deletElemFunc(elemDel:any) {
    if (elemDel.target.className === 'taskButton') {
      controlerObject.deletElem(elemDel);
      viewObject.template.innerHTML = '';
      viewObject.onLoadFunc();
    }
  }
  deletAllFunc(delAll:any) {
    console.log(delAll.target);
    if (delAll.target.className === 'del') {
      controlerObject.deletAllElem(delAll);
      viewObject.template.innerHTML = '';

    }
  }
  createTemplate(
    titleText = "",
    descriptionText = "",
    completedText = "",
    checkboxTick = false,
    buttonText = "Delete element",
  ) {
    const mainWrp = document.createElement("div");

    mainWrp.className = "col-4";

    const wrp = document.createElement("div");
    wrp.className = "taskWrapper";
    // console.log(setEvent.num)
    wrp.id = modelObject.countOfIcons++;
    mainWrp.append(wrp);

    const title = document.createElement("div");
    title.innerHTML = titleText;
    title.className = "taskHeading";
    wrp.append(title);

    const description = document.createElement("div");
    description.innerHTML = descriptionText;
    description.className = "taskDescription";
    wrp.append(description);

    const completed = document.createElement("div");
    completed.innerHTML = completedText;
    completed.className = "taskCompleted";
    wrp.append(completed);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checkboxTick;
    checkbox.className = "taskCheckbox";
    wrp.append(checkbox);

    const button = document.createElement("button");
    button.innerHTML = buttonText;
    button.className = "taskButton";
    wrp.append(button);

    return mainWrp;
  }
  renderItem({ title, description, completed, checkbox }:any) {
    const template = viewObject.createTemplate(
      title,
      description,
      completed,
      checkbox
    );
    let doItem = <HTMLDivElement>document.querySelector("#todoItems")
    doItem.prepend(template);
  }
  creatDeleteAllButt(deleteAllText = 'Delete All') {
    const deleteAll = <HTMLButtonElement>document.createElement("button");
    const dellBut = <HTMLFormElement>document.querySelector("#todoForm");
    const spanOuter = <HTMLSpanElement>document.createElement("span");
    const spanInner = <HTMLSpanElement>document.createElement("span");
    deleteAll.append(spanOuter);
    spanOuter.append(spanInner);
    spanOuter.className = "buttonDel__text";
    spanInner.innerHTML = deleteAllText;
    spanInner.className = "del";
    deleteAll.className = "buttonDel";
    deleteAll.setAttribute('type', 'button');
    dellBut.append(deleteAll);
    console.log(deleteAll);
    
  }
};

  export let viewObject = new TodoView();



