import { Data } from "./data";
import { StaticInstance } from "./StaticInstance";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PathEditor extends cc.Component {
    private blockGroup;
    onLoad() {
        this.blockGroup = StaticInstance.blockgroup;
    }
    onTouchStart(event) {
        let pos = event.getLocation()
        let select = this.blockGroup.getEndSelevtImage(pos);
        if(select==null)return
        // select.spriteFrame=null;
        let block=select.node.getComponent('Block')
        Data.instance.setList(block.getIndex())
        StaticInstance.blockgroup.updatePathData(); 
    }
    onTouchMove(event) {

    }
    onTouchEnd(event) {

    }
    onTouchCancel(event) {

    }
}
