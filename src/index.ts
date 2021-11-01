
"use strict";

import {viewObject} from "./toDoView";
import {modelObject} from "./todoModel";



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



export let controlerObject = new TodoController();

viewObject.setEvents();
viewObject.creatDeleteAllButt()

// console.log(modelObject);

// console.log(setEvent)

