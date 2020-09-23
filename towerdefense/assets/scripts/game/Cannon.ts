const { ccclass, property } = cc._decorator;
@ccclass
export default class Cannon extends cc.Component {
    @property(cc.Label) levelLabel: cc.Label = null;
    @property(cc.Node)gun:cc.Node=null;
    @property(cc.Node)pad:cc.Node=null;
    @property(cc.SpriteAtlas)gunAtlas:cc.SpriteAtlas=null;
    @property(cc.SpriteAtlas)padAtlas:cc.SpriteAtlas=null;
    private objData;
    private type:number=0;
    private curLevel:number=1;
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
    setLevel(lv) {
        this.curLevel=lv;
        this.levelLabel.string = "" + lv;
        this.updateStyle();
    }
    setobjData(index) {
        this.objData = index
    }
    getobjData() {
        return this.objData;
    }
    setType(type) {
        this.type = type
        this.updateStyle();
    }
    updateStyle(){
        let name=''+this.type+"_"+(this.curLevel-1);
        let gunframe=this.gunAtlas.getSpriteFrame(name);
        this.gun.getComponent(cc.Sprite).spriteFrame=gunframe;
        let index=Math.floor(this.curLevel-1/3)
        name=''+this.type+"_"+index;
        let padframe=this.padAtlas.getSpriteFrame(name);
        this.pad.getComponent(cc.Sprite).spriteFrame=padframe;

    }
}
