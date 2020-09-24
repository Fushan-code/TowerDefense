import { StaticInstance } from "../StaticInstance";
import { Util } from "../util/Util";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Cannon extends cc.Component {
    @property(cc.Label) levelLabel: cc.Label = null;
    @property(cc.Node) gun: cc.Node = null;
    @property(cc.Node) pad: cc.Node = null;
    @property(cc.Node) mergeRemind: cc.Node = null;
    @property(cc.Node) range: cc.Node = null;
    @property(cc.SpriteAtlas) gunAtlas: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) padAtlas: cc.SpriteAtlas = null;
    private objData;
    private type: number = 0;
    private curLevel: number = 1;
    private attackTarget;
    private fire: boolean = false;
    onLoad() { }

    //落地特效-放大渐隐
    effectAction() {
        let self = cc.instantiate(this.node)
        this.node.addChild(self)
        self.setPosition(cc.v2(0, 0))
        let scale = cc.scaleTo(0.1, 4);
        let fade = cc.fadeOut(0.1);
        let sp = cc.spawn(scale, fade);
        let seq = cc.sequence(cc.delayTime(0.1), sp, cc.callFunc(() => {
            self.removeFromParent();
        }))
        self.runAction(seq);
    }
    setMergeRemind(flag) {
        this.mergeRemind.active = flag;
    }
    setRange(flag) {
        this.range.active = flag;
    }
    getLevel() {
        return this.curLevel;
    }
    setobjData(objData) {
        this.objData = objData
    }
    getobjData() {
        return this.objData;
    }
    setType(type) {
        this.type = type
        this.updateStyle();
    }
    getType() {
        return this.type;
    }
    updateStyle() {
        let name = '' + this.type + "_" + (this.curLevel - 1);
        let gunframe = this.gunAtlas.getSpriteFrame(name);
        this.gun.getComponent(cc.Sprite).spriteFrame = gunframe;
        let index = Math.floor(this.curLevel - 1 / 3)
        name = '' + this.type + "_" + index;
        let padframe = this.padAtlas.getSpriteFrame(name);
        this.pad.getComponent(cc.Sprite).spriteFrame = padframe;
        this.levelLabel.string = "" + this.curLevel;
    }
    compare(cannon) {
        let com = cannon.getComponent('Cannon')
        let level = com.getLevel();
        let type = com.getType();
        if (this.curLevel == 9 || level == 9) {
            return;
        }
        if (this.curLevel == level && this.type == type) {
            return true;
        }
        return false;
    }
    levelUp() {
        if (this.curLevel == 9) return
        this.curLevel++;
        this.updateStyle();

    }
    setRot(rot) {
        this.gun.angle = rot;
    }
    /**
     *炮口朝向
     * @param {*} target
     * @memberof Cannon
     */
    setTarget(target) {
        this.attackTarget = target;
        this.fire = false;
    }
    findMonsterAttack() {

    }
    update(dt) {
        if (this.attackTarget == null) {
            let target = this.attackTarget = StaticInstance.monsterBuild.calculateDistance(this.node)
            this.setTarget(target);
        }
        if (this.attackTarget!= null) {
            if (this.attackTarget.getComponent('MstItem').getDead()) {
                this.setTarget(null)
                return
            }
            let dis = Util.getDistance(this.attackTarget.getPosition(), this.node.getPosition())
            if (Math.abs(dis) > 230) {
                this.setTarget(null)
                return;
            }
            let startPos = this.node.getPosition();
            let endPos = this.attackTarget.getPosition();
            let angle = Util.getAngle(startPos, endPos);
            angle += (360 - 90);
            if (this.fire) {
                this.setRot(angle);
            } else {
                let moveAngle = 100 * dt;
                if (this.gun.angle > angle) {
                    moveAngle = -moveAngle
                }
                this.gun.angle += moveAngle;
                if (this.gun.angle - angle < moveAngle) {
                    this.fire = true;
                    this.setRot(angle);
                }
            }

        }
    }
}
