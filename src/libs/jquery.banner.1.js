;(function () {
    "use strict";
    $.fn.banner = function (options){
        this._obj_ = {
            list:options.list===false ? false : true,
            index:options.index || 0,
            autoPlay:options.autoPlay===false ? false : true,
            delayTime:options.delayTime || 2000,
            moveTime:options.moveTime || 200,
            iPrev:options.items.length-1
        };
        var that = this;
        this._obj_.init = function () {
            that.css({
                overflow:"hidden"
            });
            options.items.css({
                position:"absolute",
                left:options.items.eq(0).width(),
                top:0
            }).eq(this.index).css({
                left:0
            })
        };
        this._obj_.init();
        function btnLeft() {
            if (that._obj_.index === 0){
                that._obj_.index = options.items.length-1;
                that._obj_.iPrev = 0
            }else {
                that._obj_.index--;
                that._obj_.iPrev = that._obj_.index+1
            }
            that._obj_.btnMove(1);
        }
        function btnRight() {
            if (that._obj_.index===options.items.length-1){
                that._obj_.index = 0;
                that._obj_.iPrev = options.items.length-1
            }else {
                that._obj_.index++;
                that._obj_.iPrev = that._obj_.index-1
            }
            that._obj_.btnMove(-1);
        }
        this._obj_.btnMove = function (type) {
            options.items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:options.items.eq(0).width() * type
            },that._obj_.moveTime).end().eq(this.index).css({
                left:-options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },that._obj_.moveTime);

            if (!that._obj_.list) return;
            that.find(".list").children().css({
                background:"rgba(200,200,200,.5)"
            }).eq(that._obj_.index).css({
                background:"#f9000a"
            })
        };
        if (options.left !== undefined && options.left.length > 0 && options.right !== undefined && options.right.length > 0){
            options.left.click(btnLeft);
            options.right.click(btnRight);
        }
        if (this._obj_.list){
            var str = "";
            for (var i=0;i<options.items.length;i++){
                str += `<li>${i+1}</li>`;
            }
            $("<ul class='list'>").html(str).appendTo(this).css({
                width:156,
                height:22,
                display:"flex",
                position:"absolute",
                right:0,
                top:260,
                listStyle:"none",
                margin:"0",
                padding:"0"
            }).children().css({
                flex:1,
                borderRadius:"50%",
                background:"rgba(200,200,200,.5)",
                lineHeight:"22px",
                textAlign:"center",
                cursor:"pointer",
                margin:"0 2px"
            }).eq(this._obj_.index).css({
                background:"#f9000a"
            });
            this.find(".list").children("li").click(function () {
                if ($(this).index() > that._obj_.index){
                    that._obj_.listMover($(this).index(),1)
                }if ($(this).index() < that._obj_.index){
                    that._obj_.listMover($(this).index(),-1)
                }
                $(this).css({
                    background:"#f9000a"
                    }).siblings().css({
                    background:"rgba(200,200,200,.5)"
                    });
                that._obj_.index = $(this).index();
            });
            this._obj_.listMover = function (i,type) {
                options.items.eq(that._obj_.index).css({
                    left:0
                }).stop().animate({
                    left:-options.items.eq(0).width() * type
                },that._obj_.moveTime).end().eq(i).css({
                    left:options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                },that._obj_.moveTime)
            };
        }
        if (this._obj_.autoPlay){
            this._obj_.t = setInterval(()=>{
                options.right.trigger("click")
            },this._obj_.delayTime);
            this.hover(function () {
                clearInterval(that._obj_.t)
            },function () {
                that._obj_.t = setInterval(()=>{
                    options.right.trigger("click")
                },that._obj_.delayTime);
            })
        }
    }
})();