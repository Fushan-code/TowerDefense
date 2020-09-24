import { StaticInstance } from "../StaticInstance";
import { Util } from "../util/Util";
import Cannon from "./Cannon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MonsterBuild extends cc.Component {

    @property(cc.Prefab) pre_mstItem: cc.Prefab = null;
    private monsterPool;
    private monsterQueue = [];
    onLoad() {
        StaticInstance.monsterBuild = this;
        this.monsterPool = new cc.NodePool();
        this.schedule(function () {
            this.sortMonsterList();
        }.bind(this), 0.5);
    }
    itemMove() {
        let type = Util.randomNum(0, 2);
        let count = [10, 15, 18];
        let index = Util.randomNum(0, count[type])
        let item = this.createMonster(type, index);
        let com = item.getComponent('MstItem');
        com.move();

    }
    createMonster(type, index) {
        let item = null;
        if (this.monsterPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            item = this.monsterPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            item = cc.instantiate(this.pre_mstItem);
        }
        this.node.addChild(item);
        this.monsterQueue.push(item);
        let com = item.getComponent('MstItem')
        com.setDead(false)
        com.setImage(type, index);
        com.setPath();
        return item;
    }
    onMonsterKilled(item) {
        this.monsterPool.put(item);
    }
    /**
     *对monster进行排序,y越大的zIndex越小，利用计数器实时刷新
     * @memberof MonsterBuild
     */
    sortMonsterList() {
        if (this.monsterQueue.length < 2) return
        this.monsterQueue.sort(function (a, b) {
            if (a.y - b.y > 0.001) {
                return -1;
            } else if (a.y == b.y) {
                return 0;
            }
            return 1
        })
        for (let i = 0; i < this.monsterQueue.length ; i++) {
            this.monsterQueue[i].zIndex = i;
        }
    }
    /**
     *遍历monster数组 当与cannon的距离小于230返回monster
     * @param {*} cannon
     * @return {*} 
     * @memberof MonsterBuild
     */
    calculateDistance(cannon) {
        let minDis = 9999;
        let minMoster = null;
        for (let i = 0; i < this.monsterQueue.length ; i++) {
            let dis = Util.getDistance(this.monsterQueue[i].getPosition(),cannon.getPosition())
            if (dis < 230 && dis < Math.abs(minDis)) {
                minDis = dis;
                minMoster = this.monsterQueue[i];
            }
        }
        return minMoster;
    }
}
