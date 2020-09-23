const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {
    private index;
    setIndex(index) {
        this.index = this.index
    }
    getIndex() {
        return this.index;
    }
}
