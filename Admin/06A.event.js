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
