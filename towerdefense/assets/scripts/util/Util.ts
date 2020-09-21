export class Util {
    //点击事件
   static addClickEvent(target: cc.Node, callFunc, self, payLoad?) {
       let initScale = target.scale;
       target.on(cc.Node.EventType.TOUCH_START, function () {
           target.scale = initScale - 0.1;
       }, self);
       target.on(cc.Node.EventType.TOUCH_END, function (event: cc.Event.EventTouch) {
           callFunc.call(self, event, payLoad);
           target.scale = initScale;
       }, self);
       target.on(cc.Node.EventType.TOUCH_CANCEL, function (event: cc.Event.EventTouch) {
           callFunc.call(self, event, payLoad);
           target.scale = initScale;
       }, self);
   }
   static randomNum(minNum,maxNum){
       let num=minNum+Math.floor(Math.random()*(maxNum+1-minNum))
       return num;
   }

}