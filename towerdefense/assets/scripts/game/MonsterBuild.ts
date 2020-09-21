import { MonsterType } from "../enum/Enum";
import { StaticInstance } from "../StaticInstance";
import { Util } from "../util/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterBuild extends cc.Component {

    @property(cc.Prefab) pre_mstItem: cc.Prefab = null;
    @property(cc.Node) btn_move: cc.Node = null;
    private monsterQueue = [];
    onLoad() {
        Util.addClickEvent(this.btn_move, this.itemMove, this)
        this.schedule(function () {
            this.sortMonsterList();
        }.bind(this), 0.5);
    }
    itemMove() {
        let type = Util.randomNum(0, 2);
        let count = [10, 15, 18];
        let index = Util.randomNum(0, count[type])
        this.createMonster(type, index);
        StaticInstance.mstItem.move();
    }
    createMonster(type, index) {
        let item = cc.instantiate(this.pre_mstItem);
        this.node.addChild(item);
        this.monsterQueue.push(item);
        let com = item.getComponent('MstItem')
        com.setImage(type, index);
        com.setPath();
    }
    /**
     *对monster进行排序,y越大的zIndex越小，利用计数器实时刷新
     * @memberof MonsterBuild
     */
    sortMonsterList() {
        if (this.monsterQueue.length < 2) return
        this.monsterQueue.sort(function (a, b) {
            if (a.y - b.y > 0.001 ) {
                return -1;
            } else if (a.y == b.y) {
                return 0;
            }
            return 1
        })
        for (let i = 0; i < this.monsterQueue.length; i++) {
            this.monsterQueue[i].zIndex = i;
        }
    }
}
