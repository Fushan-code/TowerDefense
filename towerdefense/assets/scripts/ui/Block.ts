const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {
    private index;
    setIndex(index) {
        this.index = index
    }
    getIndex() {
        return this.index;
    }
}

