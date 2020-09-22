const { ccclass, property } = cc._decorator;
@ccclass
export default class Cannon extends cc.Component {
    @property(cc.Label)levelLabel:cc.Label=null;

    onLoad() { }

    //落地特效-放大渐隐
    effectAction() {
        let self = cc.instantiate(this.node)
        this.node.addChild(self)
        self.setPosition(cc.v2(0, 0))
        let scale = cc.scaleTo(0.1, 4);
        let fade = cc.fadeOut(0.1);
        let sp = cc.spawn(scale, fade);
        let seq = cc.sequence(sp, cc.callFunc(() => {
            self.removeFromParent();
        }))
        self.runAction(seq);
    }
    setLevel(lv)
    {
        this.levelLabel.string=""+lv;
    }
}
