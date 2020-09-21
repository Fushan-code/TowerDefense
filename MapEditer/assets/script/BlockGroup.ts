import Block from "./block";
import { Data } from "./data";
import { StaticInstance } from "./StaticInstance";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockGroup extends cc.Component {
    @property([cc.SpriteAtlas]) blockAtlas: cc.SpriteAtlas[] = [];
    @property(cc.Sprite) moveImage: cc.Sprite = null;//跟随鼠标的图片
    @property(cc.Node) blockMap: cc.Node = null;//地图block的根节点
    @property(cc.Node) pathMap: cc.Node = null;//路径编辑的根节点
    @property(cc.Prefab) pathBlock: cc.Prefab = null;
    private blockArr = [];//存放生产的Sprite
    private mapBlockItem = [];//存放map中的node的sprite
    private mapEditor;
    private pathEditor;

    onLoad() {
        StaticInstance.blockgroup = this;
        this.touchEvent();
    }

    start() {
        this.setFrames();
        this.buildBlockMap();
        StaticInstance.control.updateAllButton()
        this.mapEditor = this.node.getComponent('MapEditor')
        this.pathEditor = this.node.getComponent('PathEditor')
    }
    //设置地图编辑器左边可选块图片
    setFrames() {
        let widthCount = 4;
        let frames = this.blockAtlas[0].getSpriteFrames();
        for (let i = 0; i < frames.length; i++) {
            let node = new cc.Node();
            this.node.addChild(node);
            let com = node.addComponent(cc.Sprite)
            com.spriteFrame = frames[i]
            this.blockArr[i] = com;
            node.x = (i % widthCount) * 106 + i % widthCount + 106 / 2;
            node.y = -Math.floor(i / 4) * 106 - Math.floor(i / 4) - 106 / 2;
        }
    }
    //添加触摸事件并转换世界坐标为局部坐标
    touchEvent() {
        this.moveImage.node.zIndex = 100;
        this.node.on('touchstart', function (event) {
            //判断选择那种编辑模式
            if (StaticInstance.control.isMap()) {
                this.mapEditor.onTouchStart(event)
            } else if (StaticInstance.control.isPath()) {
                this.pathEditor.onTouchStart(event)
            }
        }.bind(this))
        this.node.on('touchmove', function (event) {
            if (StaticInstance.control.isMap()) {
                this.mapEditor.onTouchMove(event)
            } else if (StaticInstance.control.isPath()) {
                this.pathEditor.onTouchMove(event)
            }
        }.bind(this))
        this.node.on('touchend', function (event) {
            if (StaticInstance.control.isMap()) {
                this.mapEditor.onTouchEnd(event)
            } else if (StaticInstance.control.isPath()) {
                this.pathEditor.onTouchEnd(event)
            }
        }.bind(this))
        this.node.on('touchcancel', function (event) {
            if (StaticInstance.control.isMap()) {
                this.mapEditor.onTouchCancel(event)
            } else if (StaticInstance.control.isPath()) {
                this.pathEditor.onTouchCancel(event)
            }
        }.bind(this))
    }
    //根据世界坐标返回符合的Sprite图片
    getCurSelectImage(world_pos) {
        for (let i = 0; i < this.blockArr.length; i++) {
            var pos = this.blockArr[i].node.convertToNodeSpaceAR(world_pos);
            if (pos.x < 106 / 2 &&
                pos.x > -106 / 2 &&
                pos.y < 106 / 2 &&
                pos.y > -106 / 2) {
                return this.blockArr[i];
            }
        }
        return null;
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
                let imgName = "" + Data.instance.MapList[i][j]
                let frame = this.blockAtlas[0].getSpriteFrame(imgName)
                com.spriteFrame = frame;
            }
        }
    }
    getEndSelevtImage(world_pos) {
        for (let i = 0; i < this.mapBlockItem.length; i++) {
            for (let j = 0; j < this.mapBlockItem[i].length; j++) {
                let pos = this.mapBlockItem[i][j].node.convertToNodeSpaceAR(world_pos);
                if (pos.x < 106 / 2 &&
                    pos.x > -106 / 2 &&
                    pos.y < 106 / 2 &&
                    pos.y > -106 / 2) {
                    return this.mapBlockItem[i][j];
                }
            }
        }
        return null;
    }
    /**
     * 根据Editor中msg传入的json进行赋值
     * @param array 
     */
    loadObjectToBlockItem(array) {
        for (let i = 0; i < this.mapBlockItem.length; i++) {
            for (let j = 0; j < this.mapBlockItem[i].length; j++) {
                let frame = this.blockAtlas[0].getSpriteFrame(array[i][j])
                this.mapBlockItem[i][j].spriteFrame = frame;
            }
        }

    }
    // saveObjectToString() {
    //     let outStr = '[';
    //     for (let i = 0; i < this.mapBlockItem.length; i++) {
    //         let str = '['
    //         for (let j = 0; j < this.mapBlockItem[i].length; j++) {
    //             str += this.mapBlockItem[i][j].spriteFrame.name;
    //             str += ','
    //         }
    //         str += ']'
    //         outStr += str;
    //     }
    //     outStr += ']'
    //     return outStr;
    // }
    updatePathData() {
        this.pathMap.removeAllChildren();
        for (let i = 0; i < Data.instance.getList.length; i++) {
            let pos = Data.instance.getList[i]
            let pathBlock = cc.instantiate(this.pathBlock)
            pathBlock.x = pos.x * 106 + 106 / 2;
            pathBlock.y = pos.y * -106 - 106 / 2;
            this.pathMap.addChild(pathBlock);
            let com = pathBlock.getComponent('PathBlock')
            com.setIndex(i)
        }
    }
    updateMapBlockData() {
        for (let i = 0; i < Data.instance.MapList.length; i++) {
            for (let j = 0; j < Data.instance.MapList[i].length; j++) {
                let name=''+Data.instance.MapList[i][j];
                let frame=this.blockAtlas[0].getSpriteFrame(name)
                this.mapBlockItem[i][j].spriteFrame = frame;
            }
        }
    }
}
