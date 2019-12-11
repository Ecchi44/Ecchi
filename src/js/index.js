;(function(){
    "use strict";
class List{
    constructor() {
        this.url = "http://localhost/online/data/goods.json";
        this.food = document.querySelector(".foots");
        this.load();
        this.addEvent();
    }
    load(){
        let that = this;
        ajaxGet(this.url,function (res) {
            that.res = JSON.parse(res);
            that.display();
        })
    }
    display(){
        let str = "";
        for (let i=0;i<this.res.length;i++){
            str += `<li index="${this.res[i].goodsId}>
 <a class="img" href="" target="_blank">
                                <img alt="${this.res[i].img}" src="">
                            </a>
                            <p class="title">
                                <a href="" target="_blank">${this.res[i].name}</a>
                            </p>
                            <span>${this.res[i].price}</span>
                            <i class="addCar">加入购物车</i>
</li>`
        }
        this.food.innerHTML = str;
    }
    addEvent(){
        var that = this;
        this.cont.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.className === "addCar"){
                that.id = target.parentNode.getAttribute("index");
                that.setCookie();
            }
        })
    }
    setCookie(){
        this.goods = getCookie("goodsDECookie") ? JSON.parse(getCookie("goodsDECookie")) : [];
        if(this.goods.length < 1){
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var i = 0;
            var onoff = this.goods.some((val,idx)=>{
                i = idx;
                return val.id === this.id;
            });
            if(!onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                this.goods[i].num++;
            }
        }
        setCookie("goodsDECookie",JSON.stringify(this.goods))
    }
}
new  List;
})();