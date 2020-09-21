import { Util } from "./Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Msg extends cc.Component {
    @property(cc.Label) title: cc.Label = null;
    @property(cc.Node) btn_close: cc.Node = null;
    @property(cc.Node) btn_define: cc.Node = null;
    @property(cc.EditBox) editorBox: cc.EditBox = null;
    private okCallback;//用于存放确定回调的函数
    onLoad() {
        Util.addClickEvent(this.btn_close, this.closeMsg, this)
        Util.addClickEvent(this.btn_define, this.onClickDefine, this)

    }
    setTitle(string: string) {
        this.title.string = string;
    }
    //用于传入回调函数
    setCallBack(fun) {
        this.okCallback =fun;
    }
    hideBtn_define(flag){
        this.btn_define.active=flag;
    }
    /**
     * 将输入的数据进行图片填充
     */
    onClickDefine() {
      if(this.okCallback!=null)
      {
          this.okCallback();
      }
      this.node.active=false;
    }
    closeMsg() {
        this.node.active = false;
    }
    setStringToObject(str: string) {
        let jsonObj = JSON.parse(str);//字符串转换成json 
        if (this.okCallback != null) {
            this.okCallback(jsonObj);
        }
    }
    setEditBoxStr(str){
        this.editorBox.string=str;
    }
    getEditBoxStr(){
        return this.editorBox.string;
    }
}

