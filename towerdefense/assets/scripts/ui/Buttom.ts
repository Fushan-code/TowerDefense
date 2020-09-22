import { MakeCount } from "../enum/Enum";
import { StaticInstance } from "../StaticInstance";
import { Util } from "../util/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Buttom extends cc.Component {
    @property(cc.Node) btn_make: cc.Node = null;
    @property(cc.Node) water: cc.Node = null;
    @property(cc.Node) hammer: cc.Node = null;
    @property(cc.Label) times: cc.Label = null;
    private canMakeCount: number = 10;
    private canClickHammer: boolean = false;
    private canWaterAtion: boolean = false;
    onLoad() {
        StaticInstance.buttom = this;
        Util.addClickEvent(this.btn_make, this.onClickMake, this)
        this.updateMakeCount();
    }

    onClickMake() {
        let index=StaticInstance.cannonbuild.getCanMakeIndex();
        if(index==null)return
        if (this.canMakeCount == 0) return
        if (!this.canClickHammer) {
            this.canClickHammer = true;
            let ang1 = cc.rotateTo(0.2, 90);
            let ang2 = cc.rotateTo(0.2, 0);
            let callFunc = cc.callFunc(function () {
                this.canClickHammer = false;
            }.bind(this))
            let seq = cc.sequence(ang1, ang2, callFunc);
            this.hammer.runAction(seq)
        }
        this.subMakeNum()
        StaticInstance.cannonbuild.cannonBuild(index);
    }
    addMakeNum() {
        this.canMakeCount++;
        if (this.canMakeCount > MakeCount.Max) {
            this.canMakeCount = MakeCount.Max;
        }
        this.updateMakeCount();
    }
    subMakeNum() {
        this.canMakeCount--;
        if (this.canMakeCount < 0) {
            this.canMakeCount = 0;
        }
        if (!this.canWaterAtion) {
            this.water.height = 0;
        }
        this.updateMakeCount();
    }
    updateMakeCount() {
        this.times.string = '' + this.canMakeCount + '/' + MakeCount.Max;
    }
    update(dt) {
        if (this.canMakeCount < MakeCount.Max) {
            this.water.height += dt * 100;
            this.canWaterAtion = true;
            if (this.water.height >= 133) {
                this.addMakeNum();
                if (this.canMakeCount == MakeCount.Max) {
                    this.water.height = 133;
                    this.canWaterAtion = false;
                } else {
                    this.water.height = 0;
                }

            }
        }
    }
}
