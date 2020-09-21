import { MapDataMgr } from "../data/MapDataMgr";
import { StaticInstance } from "../StaticInstance";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MstItem extends cc.Component {
    @property([cc.SpriteAtlas]) monsterAtlas: cc.SpriteAtlas[] = [];
    @property([cc.Node]) itemImg: cc.Node[] = [];
    @property(cc.Node) item: cc.Node = null;
    private _pathList = [];
    private _type: number = null;
    private _index: number = null;
    private _curMoveIndex: number = 0;
    onLoad() {
        StaticInstance.mstItem = this;

    }
    setImage(type, index) {
        this._type = type;
        this._index = index;
        if (type < 0 || type >= this.monsterAtlas.length) return
        let frame = this.monsterAtlas[type].getSpriteFrame('' + index);
        for (let i = 0; i < this.itemImg.length; i++) {
            this.itemImg[i].getComponent(cc.Sprite).spriteFrame = frame;
        }
    }
    //更改monster朝向
    updateDir(start, end) {
        if (end.x > start.x) {
            this.itemImg[0].active = true;
            this.itemImg[1].active = false;
        } else if (end.x < start.x) {
            this.itemImg[0].active = false;
            this.itemImg[1].active = true;
        }
    }
    setPath() {
        let pathList = MapDataMgr.instance.getPathListById(1)
        for (let i = 0; i < pathList.length; i++) {
            let x = pathList[i].x * 106 + 106 / 2;
            let y = -pathList[i].y * 106 - 106 / 2
            this._pathList.push(cc.v2(x, y))
        }
        this.node.x = this._pathList[0].x;
        this.node.y = this._pathList[0].y;
        this.updateDir(this._pathList[0], this._pathList[1])
        this._curMoveIndex++;
    }
    moveAtion() {
        let moveList = [];
        for (let i = 1; i < this._pathList.length; i++) {
            let move = cc.moveTo(1, cc.v2(this._pathList[i]))
            let callFunc = cc.callFunc(function () {
                let startPos = this._pathList[this._curMoveIndex];
                let endPos = this._pathList[this._curMoveIndex + 1]
                if (endPos != null) {
                    this.updateDir(startPos, endPos)
                }
                this._curMoveIndex++;
            }.bind(this))
            moveList.push(move)
            moveList.push(callFunc)
        }
        //添加最后一个action用于移除该节点
        let callEnd = cc.callFunc(function () {
            this.node.removeFromParent();
        }.bind(this))
        moveList.push(callEnd)
        let end = cc.sequence(moveList)
        this.node.runAction(end);
    }
    scaleAtion() {
        let moveList = [];
        let scale = cc.scaleTo(0.5, 0.8, 1.2);
        let move = cc.moveBy(0.5, cc.v2(0, 80));
        let sp = cc.spawn(scale, move);
        moveList.push(sp);
        //跳到目的点
        scale = cc.scaleTo(0.5, 1, 1);
        move = cc.moveBy(0.5, cc.v2(0, -80));
        sp = cc.spawn(scale, move);
        moveList.push(sp);
        //回调添加无限循环涌动.
        let callFunc = cc.callFunc(function () {
            if (this._type > 0) {
                let moveScale1 = cc.scaleTo(0.5, 1.1, 0.9);
                let moveScale2 = cc.scaleTo(0.5, 0.9, 1.1);
                let seqMoveScale = cc.sequence(moveScale1, moveScale2);
                seqMoveScale = cc.repeatForever(seqMoveScale);
                this.item.runAction(seqMoveScale);
            } else {
                let jump1 = cc.moveBy(0.2, cc.v2(0, 30));
                let jump2 = cc.moveBy(0.2, cc.v2(0, -30));
                let jump = cc.sequence(jump1, jump2)
                jump = cc.repeatForever(jump);
                this.item.runAction(jump);
            }
        }.bind(this));
        moveList.push(callFunc);
        let seq = cc.sequence(moveList);
        this.item.runAction(seq);
    }
    /**
     *由节点进行移动,其中的monster子节点进行scale的缩放
     * @memberof MstItem
     */
    move() {
        this.moveAtion();
        this.scaleAtion();
    }
}
