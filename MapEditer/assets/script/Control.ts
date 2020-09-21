import { Data } from "./data";
import { StaticInstance } from "./StaticInstance";
import { Util } from "./Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Control extends cc.Component {
    @property(cc.Toggle) mapToggle: cc.Toggle = null;
    @property(cc.Toggle) pathToggle: cc.Toggle = null;
    @property([cc.Node]) pathButton: cc.Node[] = [];
    @property([cc.Node])mapButton:cc.Node[]=[];
    onLoad() {
        StaticInstance.control = this;
        Util.addClickEvent(this.pathButton[0],this.onDelLast,this);
        Util.addClickEvent(this.pathButton[1],this.onDelAll,this);
    }
    isMap() {
        return this.mapToggle.isChecked;
    }
    isPath() {
        return this.pathToggle.isChecked;
    }
    updateAllButton() {
        if (StaticInstance.control.isMap()) {
            this.setPathButton(false)
            this.setMapButton(true)
        } else if (StaticInstance.control.isPath()) {
            this.setPathButton(true);
            this.setMapButton(false);
        }
    }
    setPathButton(flag) {
        for (let i = 0; i < this.pathButton.length; i++) {
            this.pathButton[i].active = flag
        }
    }
    setMapButton(flag) {
        for (let i = 0; i < this.pathButton.length; i++) {
            this.mapButton[i].active = flag
        }
    }
    onDelLast(){
    Data.instance.getList.pop();
    StaticInstance.blockgroup.updatePathData();
    }
    onDelAll(){
        Data.instance.clearArr();
        StaticInstance.blockgroup.updatePathData();
    }
}
