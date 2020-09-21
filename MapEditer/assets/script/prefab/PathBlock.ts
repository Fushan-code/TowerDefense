const {ccclass, property} = cc._decorator;

@ccclass
export default class PathBlock extends cc.Component {
    @property(cc.Label)index:cc.Label=null;
    // onLoad () {}

    start () {

    }
    /**
     * 设置索引号码
     * @param index 
     */
     setIndex(index){
         this.index.string=index;
     }
 
}
