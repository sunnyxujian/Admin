/**
 * Created by xujian on 2017/3/21.
 */
(function (window) {
    //由于核心模块是首先执行的 ,所以这里的Admin构造函数,A可以直接使用
    //但是为了代码执行效率  我们再次把Admin和A传到全局
    var Admin = window.Admin;
    var arr = [];
    push = arr.push;
    Admin.parseHTML = function parseHtml(str) {
        var arr = [];
        var div = document.createElement("div");
        div.innerHTML = str;
        var list = div.childNodes;
        for (var i = 0; i < list.length; i++) {
            arr.push(list[i]);
        }
        return arr;
    }

    //其他dom方法:
    //.................
    Admin.fn.extend({
        appendTo: function (selector) {
            //首先获得伪数组
            var iObj = Admin(selector),
                len = iObj.length,
                res = [],
            //创建一个空的伪数组 用于接收处理后的dom
                newObj = Admin(),
                temp;
            return this.each(function () {
                for (var i = 0; i < len; i++) {
                    temp = i == len - 1 ? this : this.cloneNode(true);
                    iObj[i].appendChild(temp);
                    res.push(temp);
                }
            });
            res.push.apply(newObj, res);
            newObj.prev = this;
            return newObj;
        },

        unique: function (iObj) {
            var arr = [],
                newIobj = Admin();
            for (var i = 0; i < iObj.length; i++) {
                if (arr.indexOf(i) == -1) {//为-1时说明没有找到
                    arr.push(iObj[i]);
                }
            }
            push.apply(newIobj, arr);
            return newIobj;
        },
        parent: function () {
            var iObj = Admin();
            var temp = this.map(function (v) {
                return v.parentNode();
            })
            //去重
            iObj = Admin.unique(iObj);

            push.apply(iObj, temp);
            return this.pushStack(iObj);
        },
        on: function (eventName, callback) {
            return this.each(function () {
                this.addEventListener(eventName, callback);
            });
        },
        off: function (eventName, callback) {
            return this.each(function () {
                this.removeEventListener(eventName, callback.name);
            });
        }
    })
})(window);
