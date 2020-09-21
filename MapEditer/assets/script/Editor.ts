import { Data } from "./data";
import { StaticInstance } from "./StaticInstance";
import { Util } from "./Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Editor extends cc.Component {
    @property(cc.Node) Msg: cc.Node = null;
    @property(cc.Node) btn_input: cc.Node = null;
    @property(cc.Node) btn_output: cc.Node = null;

    onLoad() {
        Util.addClickEvent(this.btn_input, this.onClickInput, this);
        Util.addClickEvent(this.btn_output, this.onClickOutput, this);
    }
    onClickInput() {
        let com = this.Msg.getComponent('Msg');
        com.hideBtn_define(true)
        this.Msg.active = true;
        com.setTitle("输入编辑")
        com.setCallBack(function () {
        let str=com.getEditBoxStr()
        let arrStr=str.split('|');
        Data.instance.setListTostr(arrStr[0])
        Data.instance.setMap(arrStr[1])
        StaticInstance.blockgroup.updatePathData()
        StaticInstance.blockgroup.updateMapBlockData()
        }.bind(this))
    }
    onClickOutput() {
        let com = this.Msg.getComponent('Msg');
        com.hideBtn_define(false)
        this.Msg.active = true;
        com.setTitle("输出")
        let strList=JSON.stringify(Data.instance.getList)
        let strMap=JSON.stringify(Data.instance.MapList)
        let str="输出格式为Path|Map==>注意输入时删除该备注"+"\n"+strList+'|'+strMap
        // let str = StaticInstance.blockgroup.saveObjectToString();
        com.setEditBoxStr(str);
    }
}
