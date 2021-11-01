
"use strict";

//— Добавить к каждому todo item который создается при сабмите формы поле completed
//— поле completed должно содержать false когда пользователь только что создал todo item
//— Поле completed можно изменить прямо из элемента todo http://joxi.ru/GrqX0JLf4v1Y5A — нужно добавить в него checkbox
//— Если задача не выполнена — нежно чтобы в чекбоксе не было галочки, а если выполнена — чтобы была (сразу после создания todo item галочки нету)
//— Если пользователь нажимает на текущем элементе на галочку то нужно изменять статус текущей задачи на выполненный (completed: true)
//— Так как все todo items у нас хранятся в массиве внутри localStorage то с ним нам и нужно работать
//— Добавить возможность удалять каждый отдельный todo item
//— Добавить возможность удалять сразу все todo items
// // "use strict";

// // //— Добавить к каждому todo item который создается при сабмите формы поле completed
// // //— поле completed должно содержать false когда пользователь только что создал todo item
// // //— Поле completed можно изменить прямо из элемента todo http://joxi.ru/GrqX0JLf4v1Y5A — нужно добавить в него checkbox
// // //— Если задача не выполнена — нежно чтобы в чекбоксе не было галочки, а если выполнена — чтобы была (сразу после создания todo item галочки нету)
// // //— Если пользователь нажимает на текущем элементе на галочку то нужно изменять статус текущей задачи на выполненный (completed: true)
// // //— Так как все todo items у нас хранятся в массиве внутри localStorage то с ним нам и нужно работать
// // //— Добавить возможность удалять каждый отдельный todo item
// // //— Добавить возможность удалять сразу все todo items

class TodoModel{
  dbName:string="saved_data"
  constructor() {
    // this.dbName = "saved_data";
    // this.num = 0;
  }
  _countOfIcons:number = 0;
  get countOfIcons() {
    return this._countOfIcons;
  }
    set countOfIcons(numberValue) {
        this._countOfIcons = numberValue;
    }
  saveData(todoItem:object) {
    if (localStorage[this.dbName]) {
      const data = JSON.parse(localStorage[this.dbName]);
      data.push(todoItem);
      localStorage.setItem(this.dbName, JSON.stringify(data));
      return data;
    }
    const data = [todoItem];
    localStorage.setItem(this.dbName, JSON.stringify(data));
    return data;
  }
  getDataModel() {
    if (!localStorage.getItem(this.dbName)) return false;
    return localStorage.getItem(this.dbName);
  }
  reSetData(arr:Object) {
    localStorage.clear();
    localStorage.setItem(this.dbName, JSON.stringify(arr));
  }
  removeData() {
    localStorage.clear();
  }
};


class TodoController  {
  constructor() {
    
  
  }
  
  getData() {
    if (!modelObject.getDataModel()) return false;
    return JSON.parse(modelObject.getDataModel());
  }
  setData(inputs:Object) {
    const todoItemObject:Object = controlerObject.handleInputs(inputs);
    modelObject.saveData(todoItemObject);
    return todoItemObject;
  }
  handleInputs(inputs:any) {
    const obj:any = {};
    for (const input of inputs) {
      obj[input.name] = input.value;
    }
    obj.checkbox = false;
    obj.completed = "false";
    return obj;
  }
  makeCheckBox(boxCheck:any) {
    let index = Number(boxCheck.target.parentElement.id);
    const arr = controlerObject.getData();
    arr[index].completed = "true";
    arr[index].checkbox = !arr[index].checkbox;
    modelObject.reSetData(arr);
    return arr;
  }
  deletElem(elemDel:any) {
    let index = Number(elemDel.target.parentElement.id);
    const arr = controlerObject.getData();
    arr.splice(index, 1);
    modelObject.reSetData(arr)
    return arr;
  }
  deletAllElem(delAll:any) {
    modelObject.countOfIcons=0;
    const arr = controlerObject.getData();
    modelObject.removeData();
    return arr;
  }
};
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


let controlerObject = new TodoController();
let viewObject = new TodoView();
let modelObject:any = new TodoModel();

// console.log(modelObject);
viewObject.setEvents();
viewObject.creatDeleteAllButt()
// console.log(setEvent)

