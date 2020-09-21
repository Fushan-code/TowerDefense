import { Data } from "./data";
import { StaticInstance } from "./StaticInstance";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapEditor extends cc.Component {
    private blockGroup;
    onLoad() {
        this.blockGroup = StaticInstance.blockgroup;
    }
    onTouchStart(event) {
        let pos = event.getLocation()
        let select = this.blockGroup.getCurSelectImage(pos);
        let cur_pos = this.blockGroup.node.convertToNodeSpaceAR(pos);
        if (select != null) {
            this.blockGroup.moveImage.node.active = true;
            this.blockGroup.moveImage.node.setPosition(cur_pos);
            this.blockGroup.moveImage.spriteFrame = select.spriteFrame;
        }
    }
    onTouchMove(event) {
        let pos = event.getLocation()
        let cur_pos = this.node.convertToNodeSpaceAR(pos);
        this.blockGroup.moveImage.node.active = true;
        this.blockGroup.moveImage.node.setPosition(cur_pos);
    }
    onTouchEnd(event) {
        let pos = event.getLocation()
        let select = this.blockGroup.getEndSelevtImage(pos);
        if (select != null && this.blockGroup.moveImage.node.active) {
            // select.spriteFrame = this.blockGroup.moveImage.spriteFrame;
            let name=StaticInstance.blockgroup.moveImage.spriteFrame.name;
            let blockCom = select.node.getComponent('Block');
            let j=blockCom.getIndex().x;
            let i=blockCom.getIndex().y;
            Data.instance.changeMap(i,j,parseInt(name))
            StaticInstance.blockgroup.updateMapBlockData();
        }
        this.blockGroup.moveImage.node.active = false;
    }
    onTouchCancel(event) {
        this.blockGroup.moveImage.node.active = false;
    }
}
