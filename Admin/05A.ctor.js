/**
 * Created by xujian on 2017/3/21.
 */
(function (window) {
    var Admin = window.Admin;
    var arr = [];
    var push = arr.push;

    Admin.fn.type = "Admin";

    var init = Admin.fn.init = function (selector) {
        //处理null undefind
        if (!selector) return this;

        if (typeof selector == "string") {
            if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">") {
                push.apply(this, Admin.parseHTML(selector));
                return this;
            } else {
                push.apply(this, Admin.select(selector));
                return this;
            }

        }
        //处理dom元素:nodeType //传入的是单个元素 还可以使用push.call(this,selector)
        if (selector.nodeType) {
            //this[0] = selector;
            //this.length = 1;
            push.apply(this,selector);
            return this;
        }

        //处理Admin元素:
        if (selector.constructor == Admin) {
            //方案1.直接返回传入的对象
            //return selector;
            //方案2(推荐)将传入的Admin对象的每一个元素一一加到this中 构成一个新的对象
            push.apply(this,selector);
            return this;
        }

        //处理函数:
        if (typeof selector == "function") {
            window.addEventListener( "load",selector );
        }
    };


    init.prototype = Admin.fn;

})(window);
