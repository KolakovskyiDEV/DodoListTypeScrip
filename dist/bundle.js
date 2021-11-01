/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.controlerObject = void 0;
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
var toDoView_1 = __webpack_require__(/*! ./toDoView */ "./src/toDoView.ts");
var todoModel_1 = __webpack_require__(/*! ./todoModel */ "./src/todoModel.ts");
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    TodoController.prototype.getData = function () {
        if (!todoModel_1.modelObject.getDataModel())
            return false;
        return JSON.parse(todoModel_1.modelObject.getDataModel());
    };
    TodoController.prototype.setData = function (inputs) {
        var todoItemObject = exports.controlerObject.handleInputs(inputs);
        todoModel_1.modelObject.saveData(todoItemObject);
        return todoItemObject;
    };
    TodoController.prototype.handleInputs = function (inputs) {
        var obj = {};
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            obj[input.name] = input.value;
        }
        obj.checkbox = false;
        obj.completed = "false";
        return obj;
    };
    TodoController.prototype.makeCheckBox = function (boxCheck) {
        var index = Number(boxCheck.target.parentElement.id);
        var arr = exports.controlerObject.getData();
        arr[index].completed = "true";
        arr[index].checkbox = !arr[index].checkbox;
        todoModel_1.modelObject.reSetData(arr);
        return arr;
    };
    TodoController.prototype.deletElem = function (elemDel) {
        var index = Number(elemDel.target.parentElement.id);
        var arr = exports.controlerObject.getData();
        arr.splice(index, 1);
        todoModel_1.modelObject.reSetData(arr);
        return arr;
    };
    TodoController.prototype.deletAllElem = function (delAll) {
        todoModel_1.modelObject.countOfIcons = 0;
        var arr = exports.controlerObject.getData();
        todoModel_1.modelObject.removeData();
        return arr;
    };
    return TodoController;
}());
;
exports.controlerObject = new TodoController();
toDoView_1.viewObject.setEvents();
toDoView_1.viewObject.creatDeleteAllButt();


/***/ }),

/***/ "./src/toDoView.ts":
/*!*************************!*\
  !*** ./src/toDoView.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewObject = void 0;
var todoModel_1 = __webpack_require__(/*! ./todoModel */ "./src/todoModel.ts");
var index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
var TodoView = /** @class */ (function () {
    function TodoView() {
        this.form = document.querySelector("#todoForm");
        this.template = document.querySelector("#todoItems");
        this.removeAll = document.querySelector("#todoForm");
    }
    TodoView.prototype.setEvents = function () {
        window.addEventListener("load", exports.viewObject.onLoadFunc);
        this.form.addEventListener("submit", exports.viewObject.formSubmit);
        this.template.addEventListener("change", exports.viewObject.checkBoxFunc);
        this.template.addEventListener("click", exports.viewObject.deletElemFunc);
        this.removeAll.addEventListener("click", exports.viewObject.deletAllFunc);
    };
    TodoView.prototype.formSubmit = function (e) {
        e.preventDefault();
        var inputs = e.target.querySelectorAll("input, textarea");
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            if (!input.value.length)
                return alert("No way you can add this shit");
        }
        index_1.controlerObject.setData(inputs);
        var todoItemObject = index_1.controlerObject.getData()[index_1.controlerObject.getData().length - 1];
        exports.viewObject.renderItem(todoItemObject);
        e.target.reset();
    };
    TodoView.prototype.onLoadFunc = function () {
        if (!localStorage.getItem("saved_data"))
            return false;
        todoModel_1.modelObject.countOfIcons = 0;
        index_1.controlerObject.getData().forEach(function (item) { return exports.viewObject.renderItem(item); });
    };
    TodoView.prototype.checkBoxFunc = function (boxCheck) {
        index_1.controlerObject.makeCheckBox(boxCheck);
        // console.log(setEvent.template);
        exports.viewObject.template.textContent = "";
        exports.viewObject.onLoadFunc();
    };
    TodoView.prototype.deletElemFunc = function (elemDel) {
        if (elemDel.target.className === 'taskButton') {
            index_1.controlerObject.deletElem(elemDel);
            exports.viewObject.template.innerHTML = '';
            exports.viewObject.onLoadFunc();
        }
    };
    TodoView.prototype.deletAllFunc = function (delAll) {
        console.log(delAll.target);
        if (delAll.target.className === 'del') {
            index_1.controlerObject.deletAllElem(delAll);
            exports.viewObject.template.innerHTML = '';
        }
    };
    TodoView.prototype.createTemplate = function (titleText, descriptionText, completedText, checkboxTick, buttonText) {
        if (titleText === void 0) { titleText = ""; }
        if (descriptionText === void 0) { descriptionText = ""; }
        if (completedText === void 0) { completedText = ""; }
        if (checkboxTick === void 0) { checkboxTick = false; }
        if (buttonText === void 0) { buttonText = "Delete element"; }
        var mainWrp = document.createElement("div");
        mainWrp.className = "col-4";
        var wrp = document.createElement("div");
        wrp.className = "taskWrapper";
        // console.log(setEvent.num)
        wrp.id = todoModel_1.modelObject.countOfIcons++;
        mainWrp.append(wrp);
        var title = document.createElement("div");
        title.innerHTML = titleText;
        title.className = "taskHeading";
        wrp.append(title);
        var description = document.createElement("div");
        description.innerHTML = descriptionText;
        description.className = "taskDescription";
        wrp.append(description);
        var completed = document.createElement("div");
        completed.innerHTML = completedText;
        completed.className = "taskCompleted";
        wrp.append(completed);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = checkboxTick;
        checkbox.className = "taskCheckbox";
        wrp.append(checkbox);
        var button = document.createElement("button");
        button.innerHTML = buttonText;
        button.className = "taskButton";
        wrp.append(button);
        return mainWrp;
    };
    TodoView.prototype.renderItem = function (_a) {
        var title = _a.title, description = _a.description, completed = _a.completed, checkbox = _a.checkbox;
        var template = exports.viewObject.createTemplate(title, description, completed, checkbox);
        var doItem = document.querySelector("#todoItems");
        doItem.prepend(template);
    };
    TodoView.prototype.creatDeleteAllButt = function (deleteAllText) {
        if (deleteAllText === void 0) { deleteAllText = 'Delete All'; }
        var deleteAll = document.createElement("button");
        var dellBut = document.querySelector("#todoForm");
        var spanOuter = document.createElement("span");
        var spanInner = document.createElement("span");
        deleteAll.append(spanOuter);
        spanOuter.append(spanInner);
        spanOuter.className = "buttonDel__text";
        spanInner.innerHTML = deleteAllText;
        spanInner.className = "del";
        deleteAll.className = "buttonDel";
        deleteAll.setAttribute('type', 'button');
        dellBut.append(deleteAll);
        console.log(deleteAll);
    };
    return TodoView;
}());
;
exports.viewObject = new TodoView();


/***/ }),

/***/ "./src/todoModel.ts":
/*!**************************!*\
  !*** ./src/todoModel.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.modelObject = void 0;
var TodoModel = /** @class */ (function () {
    function TodoModel() {
        this.dbName = "saved_data";
        this._countOfIcons = 0;
        // this.dbName = "saved_data";
        // this.num = 0;
    }
    Object.defineProperty(TodoModel.prototype, "countOfIcons", {
        get: function () {
            return this._countOfIcons;
        },
        set: function (numberValue) {
            this._countOfIcons = numberValue;
        },
        enumerable: false,
        configurable: true
    });
    TodoModel.prototype.saveData = function (todoItem) {
        if (localStorage[this.dbName]) {
            var data_1 = JSON.parse(localStorage[this.dbName]);
            data_1.push(todoItem);
            localStorage.setItem(this.dbName, JSON.stringify(data_1));
            return data_1;
        }
        var data = [todoItem];
        localStorage.setItem(this.dbName, JSON.stringify(data));
        return data;
    };
    TodoModel.prototype.getDataModel = function () {
        if (!localStorage.getItem(this.dbName))
            return false;
        return localStorage.getItem(this.dbName);
    };
    TodoModel.prototype.reSetData = function (arr) {
        localStorage.clear();
        localStorage.setItem(this.dbName, JSON.stringify(arr));
    };
    TodoModel.prototype.removeData = function () {
        localStorage.clear();
    };
    return TodoModel;
}());
;
exports.modelObject = new TodoModel();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUFBLENBQUM7QUFFUyxtQkFBVyxHQUFPLElBQUksU0FBUyxFQUFFLENBQUM7Ozs7Ozs7VUNyQy9DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2MvLi9zcmMvdG9Eb1ZpZXcudHMiLCJ3ZWJwYWNrOi8vYy8uL3NyYy90b2RvTW9kZWwudHMiLCJ3ZWJwYWNrOi8vYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cInVzZSBzdHJpY3RcIjtcblxuLy/igJQg0JTQvtCx0LDQstC40YLRjCDQuiDQutCw0LbQtNC+0LzRgyB0b2RvIGl0ZW0g0LrQvtGC0L7RgNGL0Lkg0YHQvtC30LTQsNC10YLRgdGPINC/0YDQuCDRgdCw0LHQvNC40YLQtSDRhNC+0YDQvNGLINC/0L7Qu9C1IGNvbXBsZXRlZFxuLy/igJQg0L/QvtC70LUgY29tcGxldGVkINC00L7Qu9C20L3QviDRgdC+0LTQtdGA0LbQsNGC0YwgZmFsc2Ug0LrQvtCz0LTQsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YLQvtC70YzQutC+INGH0YLQviDRgdC+0LfQtNCw0LsgdG9kbyBpdGVtXG4vL+KAlCDQn9C+0LvQtSBjb21wbGV0ZWQg0LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC/0YDRj9C80L4g0LjQtyDRjdC70LXQvNC10L3RgtCwIHRvZG8gaHR0cDovL2pveGkucnUvR3JxWDBKTGY0djFZNUEg4oCUINC90YPQttC90L4g0LTQvtCx0LDQstC40YLRjCDQsiDQvdC10LPQviBjaGVja2JveFxuLy/igJQg0JXRgdC70Lgg0LfQsNC00LDRh9CwINC90LUg0LLRi9C/0L7Qu9C90LXQvdCwIOKAlCDQvdC10LbQvdC+INGH0YLQvtCx0Ysg0LIg0YfQtdC60LHQvtC60YHQtSDQvdC1INCx0YvQu9C+INCz0LDQu9C+0YfQutC4LCDQsCDQtdGB0LvQuCDQstGL0L/QvtC70L3QtdC90LAg4oCUINGH0YLQvtCx0Ysg0LHRi9C70LAgKNGB0YDQsNC30YMg0L/QvtGB0LvQtSDRgdC+0LfQtNCw0L3QuNGPIHRvZG8gaXRlbSDQs9Cw0LvQvtGH0LrQuCDQvdC10YLRgylcbi8v4oCUINCV0YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdCw0LbQuNC80LDQtdGCINC90LAg0YLQtdC60YPRidC10Lwg0Y3Qu9C10LzQtdC90YLQtSDQvdCwINCz0LDQu9C+0YfQutGDINGC0L4g0L3Rg9C20L3QviDQuNC30LzQtdC90Y/RgtGMINGB0YLQsNGC0YPRgSDRgtC10LrRg9GJ0LXQuSDQt9Cw0LTQsNGH0Lgg0L3QsCDQstGL0L/QvtC70L3QtdC90L3Ri9C5IChjb21wbGV0ZWQ6IHRydWUpXG4vL+KAlCDQotCw0Log0LrQsNC6INCy0YHQtSB0b2RvIGl0ZW1zINGDINC90LDRgSDRhdGA0LDQvdGP0YLRgdGPINCyINC80LDRgdGB0LjQstC1INCy0L3Rg9GC0YDQuCBsb2NhbFN0b3JhZ2Ug0YLQviDRgSDQvdC40Lwg0L3QsNC8INC4INC90YPQttC90L4g0YDQsNCx0L7RgtCw0YLRjFxuLy/igJQg0JTQvtCx0LDQstC40YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINGD0LTQsNC70Y/RgtGMINC60LDQttC00YvQuSDQvtGC0LTQtdC70YzQvdGL0LkgdG9kbyBpdGVtXG4vL+KAlCDQlNC+0LHQsNCy0LjRgtGMINCy0L7Qt9C80L7QttC90L7RgdGC0Ywg0YPQtNCw0LvRj9GC0Ywg0YHRgNCw0LfRgyDQstGB0LUgdG9kbyBpdGVtc1xuLy8gLy8gXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIC8vIC8v4oCUINCU0L7QsdCw0LLQuNGC0Ywg0Log0LrQsNC20LTQvtC80YMgdG9kbyBpdGVtINC60L7RgtC+0YDRi9C5INGB0L7Qt9C00LDQtdGC0YHRjyDQv9GA0Lgg0YHQsNCx0LzQuNGC0LUg0YTQvtGA0LzRiyDQv9C+0LvQtSBjb21wbGV0ZWRcbi8vIC8vIC8v4oCUINC/0L7Qu9C1IGNvbXBsZXRlZCDQtNC+0LvQttC90L4g0YHQvtC00LXRgNC20LDRgtGMIGZhbHNlINC60L7Qs9C00LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINGC0L7Qu9GM0LrQviDRh9GC0L4g0YHQvtC30LTQsNC7IHRvZG8gaXRlbVxuLy8gLy8gLy/igJQg0J/QvtC70LUgY29tcGxldGVkINC80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQv9GA0Y/QvNC+INC40Lcg0Y3Qu9C10LzQtdC90YLQsCB0b2RvIGh0dHA6Ly9qb3hpLnJ1L0dycVgwSkxmNHYxWTVBIOKAlCDQvdGD0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0LIg0L3QtdCz0L4gY2hlY2tib3hcbi8vIC8vIC8v4oCUINCV0YHQu9C4INC30LDQtNCw0YfQsCDQvdC1INCy0YvQv9C+0LvQvdC10L3QsCDigJQg0L3QtdC20L3QviDRh9GC0L7QsdGLINCyINGH0LXQutCx0L7QutGB0LUg0L3QtSDQsdGL0LvQviDQs9Cw0LvQvtGH0LrQuCwg0LAg0LXRgdC70Lgg0LLRi9C/0L7Qu9C90LXQvdCwIOKAlCDRh9GC0L7QsdGLINCx0YvQu9CwICjRgdGA0LDQt9GDINC/0L7RgdC70LUg0YHQvtC30LTQsNC90LjRjyB0b2RvIGl0ZW0g0LPQsNC70L7Rh9C60Lgg0L3QtdGC0YMpXG4vLyAvLyAvL+KAlCDQldGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QsNC20LjQvNCw0LXRgiDQvdCwINGC0LXQutGD0YnQtdC8INGN0LvQtdC80LXQvdGC0LUg0L3QsCDQs9Cw0LvQvtGH0LrRgyDRgtC+INC90YPQttC90L4g0LjQt9C80LXQvdGP0YLRjCDRgdGC0LDRgtGD0YEg0YLQtdC60YPRidC10Lkg0LfQsNC00LDRh9C4INC90LAg0LLRi9C/0L7Qu9C90LXQvdC90YvQuSAoY29tcGxldGVkOiB0cnVlKVxuLy8gLy8gLy/igJQg0KLQsNC6INC60LDQuiDQstGB0LUgdG9kbyBpdGVtcyDRgyDQvdCw0YEg0YXRgNCw0L3Rj9GC0YHRjyDQsiDQvNCw0YHRgdC40LLQtSDQstC90YPRgtGA0LggbG9jYWxTdG9yYWdlINGC0L4g0YEg0L3QuNC8INC90LDQvCDQuCDQvdGD0LbQvdC+INGA0LDQsdC+0YLQsNGC0Yxcbi8vIC8vIC8v4oCUINCU0L7QsdCw0LLQuNGC0Ywg0LLQvtC30LzQvtC20L3QvtGB0YLRjCDRg9C00LDQu9GP0YLRjCDQutCw0LbQtNGL0Lkg0L7RgtC00LXQu9GM0L3Ri9C5IHRvZG8gaXRlbVxuLy8gLy8gLy/igJQg0JTQvtCx0LDQstC40YLRjCDQstC+0LfQvNC+0LbQvdC+0YHRgtGMINGD0LTQsNC70Y/RgtGMINGB0YDQsNC30YMg0LLRgdC1IHRvZG8gaXRlbXNcbmltcG9ydCB7dmlld09iamVjdH0gZnJvbSBcIi4vdG9Eb1ZpZXdcIjtcbmltcG9ydCB7bW9kZWxPYmplY3R9IGZyb20gXCIuL3RvZG9Nb2RlbFwiO1xuXG5cblxuY2xhc3MgVG9kb0NvbnRyb2xsZXIgIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgXG4gIFxuICB9XG4gIFxuICBnZXREYXRhKCkge1xuICAgIGlmICghbW9kZWxPYmplY3QuZ2V0RGF0YU1vZGVsKCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShtb2RlbE9iamVjdC5nZXREYXRhTW9kZWwoKSk7XG4gIH1cbiAgc2V0RGF0YShpbnB1dHM6T2JqZWN0KSB7XG4gICAgY29uc3QgdG9kb0l0ZW1PYmplY3Q6T2JqZWN0ID0gY29udHJvbGVyT2JqZWN0LmhhbmRsZUlucHV0cyhpbnB1dHMpO1xuICAgIG1vZGVsT2JqZWN0LnNhdmVEYXRhKHRvZG9JdGVtT2JqZWN0KTtcbiAgICByZXR1cm4gdG9kb0l0ZW1PYmplY3Q7XG4gIH1cbiAgaGFuZGxlSW5wdXRzKGlucHV0czphbnkpIHtcbiAgICBjb25zdCBvYmo6YW55ID0ge307XG4gICAgZm9yIChjb25zdCBpbnB1dCBvZiBpbnB1dHMpIHtcbiAgICAgIG9ialtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIH1cbiAgICBvYmouY2hlY2tib3ggPSBmYWxzZTtcbiAgICBvYmouY29tcGxldGVkID0gXCJmYWxzZVwiO1xuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgbWFrZUNoZWNrQm94KGJveENoZWNrOmFueSkge1xuICAgIGxldCBpbmRleCA9IE51bWJlcihib3hDaGVjay50YXJnZXQucGFyZW50RWxlbWVudC5pZCk7XG4gICAgY29uc3QgYXJyID0gY29udHJvbGVyT2JqZWN0LmdldERhdGEoKTtcbiAgICBhcnJbaW5kZXhdLmNvbXBsZXRlZCA9IFwidHJ1ZVwiO1xuICAgIGFycltpbmRleF0uY2hlY2tib3ggPSAhYXJyW2luZGV4XS5jaGVja2JveDtcbiAgICBtb2RlbE9iamVjdC5yZVNldERhdGEoYXJyKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG4gIGRlbGV0RWxlbShlbGVtRGVsOmFueSkge1xuICAgIGxldCBpbmRleCA9IE51bWJlcihlbGVtRGVsLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKTtcbiAgICBjb25zdCBhcnIgPSBjb250cm9sZXJPYmplY3QuZ2V0RGF0YSgpO1xuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIG1vZGVsT2JqZWN0LnJlU2V0RGF0YShhcnIpXG4gICAgcmV0dXJuIGFycjtcbiAgfVxuICBkZWxldEFsbEVsZW0oZGVsQWxsOmFueSkge1xuICAgIG1vZGVsT2JqZWN0LmNvdW50T2ZJY29ucz0wO1xuICAgIGNvbnN0IGFyciA9IGNvbnRyb2xlck9iamVjdC5nZXREYXRhKCk7XG4gICAgbW9kZWxPYmplY3QucmVtb3ZlRGF0YSgpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cbn07XG5cblxuXG5leHBvcnQgbGV0IGNvbnRyb2xlck9iamVjdCA9IG5ldyBUb2RvQ29udHJvbGxlcigpO1xuXG52aWV3T2JqZWN0LnNldEV2ZW50cygpO1xudmlld09iamVjdC5jcmVhdERlbGV0ZUFsbEJ1dHQoKVxuXG4vLyBjb25zb2xlLmxvZyhtb2RlbE9iamVjdCk7XG5cbi8vIGNvbnNvbGUubG9nKHNldEV2ZW50KVxuXG4iLCIgaW1wb3J0IHttb2RlbE9iamVjdH0gZnJvbSBcIi4vdG9kb01vZGVsXCI7XHJcbiBpbXBvcnQge2NvbnRyb2xlck9iamVjdH0gZnJvbSBcIi4vaW5kZXhcIlxyXG4gXHJcbiBcclxuIGNsYXNzIFRvZG9WaWV3IHtcclxuICBmb3JtO1xyXG4gIHRlbXBsYXRlO1xyXG4gIHJlbW92ZUFsbDtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIFxyXG4gICAgdGhpcy5mb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZG9Gb3JtXCIpO1xyXG4gICAgdGhpcy50ZW1wbGF0ZSA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZG9JdGVtc1wiKTtcclxuICAgIHRoaXMucmVtb3ZlQWxsID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZG9Gb3JtXCIpO1xyXG4gIH1cclxuICBzZXRFdmVudHMoKSB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdmlld09iamVjdC5vbkxvYWRGdW5jKTtcclxuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHZpZXdPYmplY3QuZm9ybVN1Ym1pdCk7XHJcbiAgICB0aGlzLnRlbXBsYXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdmlld09iamVjdC5jaGVja0JveEZ1bmMpO1xyXG4gICAgdGhpcy50ZW1wbGF0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmlld09iamVjdC5kZWxldEVsZW1GdW5jKTtcclxuICAgIHRoaXMucmVtb3ZlQWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2aWV3T2JqZWN0LmRlbGV0QWxsRnVuYyk7XHJcbiAgfVxyXG4gIGZvcm1TdWJtaXQoZTphbnkpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGlucHV0cyA9IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgdGV4dGFyZWFcIik7XHJcblxyXG4gICAgZm9yIChjb25zdCBpbnB1dCBvZiBpbnB1dHMpIHtcclxuICAgICAgaWYgKCFpbnB1dC52YWx1ZS5sZW5ndGgpIHJldHVybiBhbGVydChcIk5vIHdheSB5b3UgY2FuIGFkZCB0aGlzIHNoaXRcIik7XHJcbiAgICB9XHJcbiAgICBjb250cm9sZXJPYmplY3Quc2V0RGF0YShpbnB1dHMpO1xyXG4gICAgY29uc3QgdG9kb0l0ZW1PYmplY3QgPVxyXG4gICAgY29udHJvbGVyT2JqZWN0LmdldERhdGEoKVtjb250cm9sZXJPYmplY3QuZ2V0RGF0YSgpLmxlbmd0aCAtIDFdO1xyXG4gICAgdmlld09iamVjdC5yZW5kZXJJdGVtKHRvZG9JdGVtT2JqZWN0KTtcclxuICAgIGUudGFyZ2V0LnJlc2V0KCk7XHJcbiAgfVxyXG4gIG9uTG9hZEZ1bmMoKSB7XHJcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2F2ZWRfZGF0YVwiKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgbW9kZWxPYmplY3QuY291bnRPZkljb25zPTA7XHJcbiAgICBjb250cm9sZXJPYmplY3QuZ2V0RGF0YSgpLmZvckVhY2goKGl0ZW06YW55KSA9PiB2aWV3T2JqZWN0LnJlbmRlckl0ZW0oaXRlbSkpO1xyXG4gIH1cclxuICBjaGVja0JveEZ1bmMoYm94Q2hlY2s6YW55KSB7XHJcbiAgICBjb250cm9sZXJPYmplY3QubWFrZUNoZWNrQm94KGJveENoZWNrKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHNldEV2ZW50LnRlbXBsYXRlKTtcclxuICAgIHZpZXdPYmplY3QudGVtcGxhdGUudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgdmlld09iamVjdC5vbkxvYWRGdW5jKCk7XHJcbiAgfVxyXG4gIGRlbGV0RWxlbUZ1bmMoZWxlbURlbDphbnkpIHtcclxuICAgIGlmIChlbGVtRGVsLnRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrQnV0dG9uJykge1xyXG4gICAgICBjb250cm9sZXJPYmplY3QuZGVsZXRFbGVtKGVsZW1EZWwpO1xyXG4gICAgICB2aWV3T2JqZWN0LnRlbXBsYXRlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICB2aWV3T2JqZWN0Lm9uTG9hZEZ1bmMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgZGVsZXRBbGxGdW5jKGRlbEFsbDphbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKGRlbEFsbC50YXJnZXQpO1xyXG4gICAgaWYgKGRlbEFsbC50YXJnZXQuY2xhc3NOYW1lID09PSAnZGVsJykge1xyXG4gICAgICBjb250cm9sZXJPYmplY3QuZGVsZXRBbGxFbGVtKGRlbEFsbCk7XHJcbiAgICAgIHZpZXdPYmplY3QudGVtcGxhdGUuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBjcmVhdGVUZW1wbGF0ZShcclxuICAgIHRpdGxlVGV4dCA9IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvblRleHQgPSBcIlwiLFxyXG4gICAgY29tcGxldGVkVGV4dCA9IFwiXCIsXHJcbiAgICBjaGVja2JveFRpY2sgPSBmYWxzZSxcclxuICAgIGJ1dHRvblRleHQgPSBcIkRlbGV0ZSBlbGVtZW50XCIsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBtYWluV3JwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBtYWluV3JwLmNsYXNzTmFtZSA9IFwiY29sLTRcIjtcclxuXHJcbiAgICBjb25zdCB3cnAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgd3JwLmNsYXNzTmFtZSA9IFwidGFza1dyYXBwZXJcIjtcclxuICAgIC8vIGNvbnNvbGUubG9nKHNldEV2ZW50Lm51bSlcclxuICAgIHdycC5pZCA9IG1vZGVsT2JqZWN0LmNvdW50T2ZJY29ucysrO1xyXG4gICAgbWFpbldycC5hcHBlbmQod3JwKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aXRsZS5pbm5lckhUTUwgPSB0aXRsZVRleHQ7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRhc2tIZWFkaW5nXCI7XHJcbiAgICB3cnAuYXBwZW5kKHRpdGxlKTtcclxuXHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkZXNjcmlwdGlvbi5pbm5lckhUTUwgPSBkZXNjcmlwdGlvblRleHQ7XHJcbiAgICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSBcInRhc2tEZXNjcmlwdGlvblwiO1xyXG4gICAgd3JwLmFwcGVuZChkZXNjcmlwdGlvbik7XHJcblxyXG4gICAgY29uc3QgY29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbXBsZXRlZC5pbm5lckhUTUwgPSBjb21wbGV0ZWRUZXh0O1xyXG4gICAgY29tcGxldGVkLmNsYXNzTmFtZSA9IFwidGFza0NvbXBsZXRlZFwiO1xyXG4gICAgd3JwLmFwcGVuZChjb21wbGV0ZWQpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcclxuICAgIGNoZWNrYm94LmNoZWNrZWQgPSBjaGVja2JveFRpY2s7XHJcbiAgICBjaGVja2JveC5jbGFzc05hbWUgPSBcInRhc2tDaGVja2JveFwiO1xyXG4gICAgd3JwLmFwcGVuZChjaGVja2JveCk7XHJcblxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBidXR0b25UZXh0O1xyXG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwidGFza0J1dHRvblwiO1xyXG4gICAgd3JwLmFwcGVuZChidXR0b24pO1xyXG5cclxuICAgIHJldHVybiBtYWluV3JwO1xyXG4gIH1cclxuICByZW5kZXJJdGVtKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIGNoZWNrYm94IH06YW55KSB7XHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHZpZXdPYmplY3QuY3JlYXRlVGVtcGxhdGUoXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgY29tcGxldGVkLFxyXG4gICAgICBjaGVja2JveFxyXG4gICAgKTtcclxuICAgIGxldCBkb0l0ZW0gPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RvSXRlbXNcIilcclxuICAgIGRvSXRlbS5wcmVwZW5kKHRlbXBsYXRlKTtcclxuICB9XHJcbiAgY3JlYXREZWxldGVBbGxCdXR0KGRlbGV0ZUFsbFRleHQgPSAnRGVsZXRlIEFsbCcpIHtcclxuICAgIGNvbnN0IGRlbGV0ZUFsbCA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgZGVsbEJ1dCA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RvRm9ybVwiKTtcclxuICAgIGNvbnN0IHNwYW5PdXRlciA9IDxIVE1MU3BhbkVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBjb25zdCBzcGFuSW5uZXIgPSA8SFRNTFNwYW5FbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgZGVsZXRlQWxsLmFwcGVuZChzcGFuT3V0ZXIpO1xyXG4gICAgc3Bhbk91dGVyLmFwcGVuZChzcGFuSW5uZXIpO1xyXG4gICAgc3Bhbk91dGVyLmNsYXNzTmFtZSA9IFwiYnV0dG9uRGVsX190ZXh0XCI7XHJcbiAgICBzcGFuSW5uZXIuaW5uZXJIVE1MID0gZGVsZXRlQWxsVGV4dDtcclxuICAgIHNwYW5Jbm5lci5jbGFzc05hbWUgPSBcImRlbFwiO1xyXG4gICAgZGVsZXRlQWxsLmNsYXNzTmFtZSA9IFwiYnV0dG9uRGVsXCI7XHJcbiAgICBkZWxldGVBbGwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgZGVsbEJ1dC5hcHBlbmQoZGVsZXRlQWxsKTtcclxuICAgIGNvbnNvbGUubG9nKGRlbGV0ZUFsbCk7XHJcbiAgICBcclxuICB9XHJcbn07XHJcblxyXG4gIGV4cG9ydCBsZXQgdmlld09iamVjdCA9IG5ldyBUb2RvVmlldygpO1xyXG5cclxuXHJcblxyXG4iLCIgY2xhc3MgVG9kb01vZGVse1xyXG4gICAgZGJOYW1lOnN0cmluZz1cInNhdmVkX2RhdGFcIlxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIC8vIHRoaXMuZGJOYW1lID0gXCJzYXZlZF9kYXRhXCI7XHJcbiAgICAgIC8vIHRoaXMubnVtID0gMDtcclxuICAgIH1cclxuICAgIF9jb3VudE9mSWNvbnM6bnVtYmVyID0gMDtcclxuICAgIGdldCBjb3VudE9mSWNvbnMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb3VudE9mSWNvbnM7XHJcbiAgICB9XHJcbiAgICAgIHNldCBjb3VudE9mSWNvbnMobnVtYmVyVmFsdWUpIHtcclxuICAgICAgICAgIHRoaXMuX2NvdW50T2ZJY29ucyA9IG51bWJlclZhbHVlO1xyXG4gICAgICB9XHJcbiAgICBzYXZlRGF0YSh0b2RvSXRlbTpvYmplY3QpIHtcclxuICAgICAgaWYgKGxvY2FsU3RvcmFnZVt0aGlzLmRiTmFtZV0pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5kYk5hbWVdKTtcclxuICAgICAgICBkYXRhLnB1c2godG9kb0l0ZW0pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuZGJOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGF0YSA9IFt0b2RvSXRlbV07XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuZGJOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgZ2V0RGF0YU1vZGVsKCkge1xyXG4gICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZGJOYW1lKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5kYk5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmVTZXREYXRhKGFycjpPYmplY3QpIHtcclxuICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuZGJOYW1lLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuICAgIH1cclxuICAgIHJlbW92ZURhdGEoKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGV4cG9ydCBsZXQgbW9kZWxPYmplY3Q6YW55ID0gbmV3IFRvZG9Nb2RlbCgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==