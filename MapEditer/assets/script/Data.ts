export class Data {
    private _pathList = [];
    private _mapBlockList = 
    [[14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14],
    [14, 14, 14, 14, 14, 14]];
    // [[14, 7, 10, 10, 5, 12], [7, 6, 12, 14, 8, 5], [9, 12, 11, 12, 14, 9], [9, 14, 13, 14, 12, 9], [8, 3, 13, 11, 7, 6], [11, 12, 11, 2, 6, 13]]
    private static _instance: Data = null
    public static get instance() {
        if (!this._instance) {
            this._instance = new Data();
        }
        return this._instance;
    }
    setList(path) {
        this._pathList.push(path)
        this._pathList = this.unique(this._pathList)//去重
    }
    get getList() {
        return this._pathList;
    }
    setListTostr(str) {
        let obj = JSON.parse(str)
        for (let i = 0; i < obj.length; i++) {
            this._pathList[i] = cc.v2(obj[i].x, obj[i]).y;
        }
    }
    setMap(str) {
        let obj = JSON.parse(str)
        for (let i = 0; i < obj.length; i++) {
            this._mapBlockList[i] = obj[i];
        }
        console.log(this._mapBlockList)
    }
    changeMap(x, y, block) {
        this._mapBlockList[x][y] = block;

    }
    get MapList() {
        return this._mapBlockList;
    }
    //清空数组
    clearArr() {
        this._pathList.splice(0, this._pathList.length)
    }
    //用于去重数组
    unique(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1)
                    j--;
                }
            }
        }
        return arr;
    }
    // [14, 7, 10, 10, 5, 12], [7, 6, 12, 14, 8, 5], [9, 12, 11, 12, 14, 9], [9, 14, 13, 14, 12, 9], [8, 3, 13, 11, 7, 6], [11, 12, 11, 2, 6, 13]
}
