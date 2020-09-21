import { MapDataMgr } from "../data/MapDataMgr";
import { StaticInstance } from "../StaticInstance";
import Block from "./Block";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockMap extends cc.Component {
    @property([cc.SpriteAtlas]) blockAtlas: cc.SpriteAtlas[] = [];
    @property(cc.Node) blockMap: cc.Node = null;//地图block的根节点
    private mapBlockItem = [];//存放map中的node的sprite 
    private curMapId:number=1;//当前选择的地图数据
    onLoad () {
   StaticInstance.blockMap=this;
   this.buildBlockMap();
    }

    start () {

    }
    buildBlockMap() {
        for (let i = 0; i < 6; i++) {
            let y = i * 106;
            this.mapBlockItem[i] = [];
            for (let j = 0; j < 6; j++) {
                let x = j * 106;
                let block = new cc.Node;
                this.blockMap.addChild(block);
                block.x = x + 106 / 2;
                block.y = -y - 106 / 2;
                let com = block.addComponent(cc.Sprite);
                let blockCom = block.addComponent(Block);
                blockCom.setIndex(cc.v2(j, i))
                this.mapBlockItem[i][j] = com;
                let arr=MapDataMgr.instance.getMapListById(this.curMapId)
                let imgName = "" +arr[i][j] 
                let frame = this.blockAtlas[0].getSpriteFrame(imgName)
                com.spriteFrame = frame;
            }
        }
    }
    // update (dt) {}
}
