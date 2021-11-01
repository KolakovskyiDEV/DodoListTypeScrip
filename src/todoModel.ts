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

  export let modelObject:any = new TodoModel();