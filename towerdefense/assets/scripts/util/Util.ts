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
    //minNum于maxNum之间的随机数
    static randomNum(minNum, maxNum) {
        let num = minNum + Math.floor(Math.random() * (maxNum + 1 - minNum))
        return num;
    }
    //计算角度
    static getAngle(start, end) {
        //两点的x、y值
        var x = end.x - start.x;
        var y = end.y - start.y;
        var hypotenuse = Math.sqrt(x * x + y * y);
        //斜边长度
        var cos = x / hypotenuse;
        var radian = Math.acos(cos);
        //求出弧度
        var angle = 180 / (Math.PI / radian);
        //用弧度算出角度
        if (y < 0) {
            angle = 0 - angle;
        }
        else if (y == 0 && x < 0) {
            angle = 180;
        }
        return angle;
    }
    //计算距离 
    static getDistance(start, end) {
        var pos = cc.v2(start.x - end.x, start.y - end.y);
        var dis = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        return dis;
    }
}