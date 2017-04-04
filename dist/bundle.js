/**
 * Created by xujian on 2017/3/21.
 */
(function (window) {
    var arr = [];
    var slice = arr.slice;

    function Admin(selector) {
        return new Admin.fn.init(selector);
    }

    Admin.fn = Admin.prototype = {
        constructor: Admin,
        length: 0,
        each: function (callback) {
            return Admin.each(this, callback);
        },
        map: function (callback) {
            return Admin.map(this, callback);
        },
        toArray: function () {
            return slice.call(this);
        },
        get: function (index) {
            if (index === undefined) {
                return this.toArray();
            } else {
                if (index >= 0) {
                    return this[index];
                } else if (index < 0) {
                    return this[this.length + index];
                }
            }
            return this;
        },
        end:function(){
            return this.prev||this;
        },
        pushStack:function(newObj){
            newObj.prev=this;
            return newObj;
        }

    };



    Admin.isArrayLike = function (arr) {
        var length = arr && arr.length;
        return typeof length === "number" && length >= 0;
    }

    Admin.each = function (arr, callback) {
        var i, k;
        if (Admin.isArrayLike(arr)) {
            for (i = 0; i < arr.length; i++) {
                if (callback.call(arr[i], i, arr[i]) === false) {
                    break
                }
            }
        } else {
            for (k in arr) {
                if (callback.call(arr[k], k, arr[k]) === false) {
                    break
                }
            }
        }
        return arr;
    };


    Admin.map = function (arr, callback) {
        var i, k, temp, res = [];
        if (Admin.isArrayLike(arr)) {
            for (i = 0; i < arr.length; i++) {
                temp = callback(arr[i], i);//因为是要对数组里的每一项进行处理  所以是将arr的每一个值都放入回调函数中
                if (temp !== undefined) {
                    res.push(temp);
                }
            }
        } else {
            for (k in arr) {
                temp = callback(arr[k], k);
                if (temp !== undefined) {
                    res.push(temp);
                }
            }
        }

        return res;
    }

    Admin.fn.extend = Admin.extend = function (obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };


    Admin.select = function (selector) {
        return document.querySelectorAll(selector);
    }

    window.Admin = window.A = Admin;

})(window);
//将代码按功能分块 只要把工厂函数暴露到全局作用域就可以了
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

/**
 * Created by xujian on 2017/3/23.
 */
(function (window) {

    var Admin=window.Admin;

    Admin.fn.extend({
        on: function (eventName, callback) {
            return this.each(function () {
                this.addEventListener(eventName, callback);
            });
        },
        off: function (eventName, callback) {
            return this.each(function () {
                this.removeEventListener(eventName, callback);
            });
        }

    });

    var meths = "abort,blur,cancel,canplay,canplaythrough,change,click,close,contextmenu,cuechange,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,emptied,ended,error,focus,input,invalid,keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,pause,play,playing,progress,ratechange,reset,resize,scroll,seeked,seeking,select,show,stalled,submit,suspend,timeupdate,toggle,volumechange,waiting,auxclick,pointercancel,pointerdown,pointerenter,pointerleave,pointermove,pointerout,pointerover,pointerup,beforecopy,beforecut,beforepaste,copy,cut,paste,search,selectstart,wheel,webkitfullscreenchange,webkitfullscreenerror,gotpointercapture,lostpointercapture";

    meths.split(",").forEach(function (v) {
        Admin.fn[v] = function (callback) {
            return this.on(v,callback);
        }
    })

})(window);

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
