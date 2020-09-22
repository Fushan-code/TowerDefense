import { StaticInstance } from "./StaticInstance";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    @property(cc.Node) gameView: cc.Node = null;
    @property(cc.Node)gameUI:cc.Node=null;
    @property(cc.Prefab)blockMap:cc.Prefab=null;
    @property(cc.Prefab)monsterNode:cc.Prefab=null;
    @property(cc.Prefab)buttom:cc.Prefab=null;
    @property(cc.Prefab)cannonBuild:cc.Prefab=null;
    onLoad(){
        StaticInstance.main=this;
    }
    initUI(){
        this.initBlockMap();
        this.initmonsterNode();
        this.initCannonBuild();
        this.initButtom();
    }
    initBlockMap() {
        let node = cc.instantiate(this.blockMap)
        this.gameView.addChild(node)
        node.setPosition(-320, 333)
    }
    initmonsterNode() {
        let node = cc.instantiate(this.monsterNode)
        this.gameView.addChild(node)
        node.setPosition(-320, 333)
    }
    initCannonBuild(){
        let node = cc.instantiate(this.cannonBuild)
        this.gameView.addChild(node) 
        node.setPosition(-320, 333)
    }
    initButtom()
    {
        let node = cc.instantiate(this.buttom)
        this.gameUI.addChild(node)
        node.setPosition(0,-623)
    }
}
