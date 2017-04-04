/**
 * Created by xujian on 2017/3/23.
 */
(function (window) {
    var Admin = window.Admin;

    Admin.fn.extend({
        css: function (name, value) {
            if (value === undefined) {
                //一个参数的情况
                if (typeof name === "string") {
                    //获取对应样式
//             return this[0].style[name]; 这种只能返回行内样式 不可取
                    return this[0].style[name] || window.getComputedStyle(this[0])[name];
                } else {
                    //设置多个样式
                    return this.each(function () {
                        var that = this;
                        Admin.each(name, function (k, v) {
                            that.style[k] = v;
                        })
                    })
                }
            } else {
                //设置一个样式
                return this.each(function () {
                    this.style[name] = value;
                })
            }
        },
        removeClass: function (name) {
            //将this中的class与name重名的去除
            return this.each(function () {
                var names = this.className && this.className.split(" ") || [];
                //可以用filter 和 map 过滤重名
                var newN = names.filter(function (v) {
                    return v != name;
                });
                this.className = newN.join(" ");
            });
        },
        hasClass: function (name) {
            //判断第0个元素是否含有name
            var dom = this[0];
            var names = dom.className && dom.className.split(" ") || [];
            for (var i = 0; i < names.length; i++) {
                if (names[i] == name) {
                    return true;
                }
            }
            return false;
        },
        attr: function (name, value) {
            if (value === undefined) {
                //获取属性
                return this[0].getAttribute(name);
            } else {
                return this.each(function () {
                    //因为要给每一个dom元素设置 所以要遍历
                    this.setAttribute(name, value);
                });
            }
        },
        prop: function (name, value) {   //专门用于处理单属性的例如 disable:FALSE
            if (value === undefined) {
                //获取属性
                return this[0][name];
            } else {
                return this.each(function () {
                    //因为要给每一个dom元素设置 所以要遍历
                    this[name] = value;
                });
            }
        }
    });
    Admin.each({
        html: "innerHTML",
        text: "innerText",
        val: "value"
    }, function (k, v) {
        Admin.fn[k] = function (value) {
            if (value === undefined) {
                return this[0][v];
            } else {
                return this.each(function () {
                    this[v] = value;
                });
            }
        };
    });
})(window);
