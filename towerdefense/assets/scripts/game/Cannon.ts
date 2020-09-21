import { MapDataMgr } from "../data/MapDataMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cannon extends cc.Component {
    private cannonList = [];

    onLoad() {

    }
    setCannonList() {
        let CannonList = MapDataMgr.instance.getCannonListById(1);
        for (let i = 0; i < CannonList.length; i++) {
            this.cannonList[i] =
                this.cannonList[i].pos = CannonList[i];
            this.cannonList[i].cannon = new Object();
            this.cannonList[i].cannon.isMake = false;
        }
    }
    createCannonObj() {
        let obj = {
            pos: cc.v2(0, 0),
            cannon: {},
            isMake: false
        }
        return obj;
    }
    isCanMakeCannon() {
        for (let i = 0; i < this.cannonList.length; i++) {
            if (!this.cannonList[i].cannon.isMake) {
                return true;
            }
        }
        return false;
    }
}
