import { MapDataMgr } from "../data/MapDataMgr";
import { StaticInstance } from "../StaticInstance";
const { ccclass, property } = cc._decorator;
const arrDataUrl = [
    "json/mapData",

]
const arrDataMar = [
    MapDataMgr.instance
]
@ccclass
export default class Init extends cc.Component {
    onLoad() {
        this.loadData();
    }
    loadData() {
        cc.loader.loadResArray(arrDataUrl, cc.JsonAsset, (err, arrRes: Array<cc.JsonAsset>) => {
            if (err) {
                console.log(err)
                return;
            }
            for (let i = 0; i < arrRes.length; i++) {
                arrDataMar[i].loadData(arrRes[i].json)
            }
            StaticInstance.main.initUI();
        })
    }
}
