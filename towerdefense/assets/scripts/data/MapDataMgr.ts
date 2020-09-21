/**
 * 地图数据管理
 */
export class MapDataMgr {
    private MapData = {};
    private static _instance: MapDataMgr = null;
    public static get instance() {
        if (!this._instance) {
            this._instance = new MapDataMgr()
        }
        return this._instance
    }
    public loadData(data) {
        data.forEach(item => {
            this.MapData[item.id] = item
        })
    }
    public get data() {
        return this.MapData
    }
    public getMapListById(id)
    {   
        return this.MapData[id]['mapList']
    }
    public getPathListById(id)
    {   
        return this.MapData[id]['pathList']
    }
    public getCannonListById(id)
    {   
        return this.MapData[id]['cannonList']
    }

}