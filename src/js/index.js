;(function(){
    "use strict";
    class List{
        constructor() {
            this.url = "./data/goods.json";
            this.foodO = document.querySelector(".food_t");
            this.foodT = document.querySelector(".foods2");
            this.foodS = document.querySelector(".foods3");
            this.addCar_b = document.querySelector(".addCar_b");
            this.load();
            this.addEvent();
        }
        load(){
            let that = this;
            ajaxGet(this.url,function (res) {
                that.res = JSON.parse(res);
                that.displayO();
                that.displayT();
                that.displayS();
            })
        }
        displayO(){
            let str = "";
            for (let i=0;i<8;i++){
                str +=`<li index="${this.res[i].goodsId}">
                    <a href="http://localhost:884/particulars.html?id='${this.res[i].goodsId}'" target="_blank" class="img">
                        <img src="${this.res[i].img}" alt="">
                    </a>
                    <p>
                        <a href="http://localhost:884/particulars.html?id='${this.res[i].goodsId}'" target="_blank">${this.res[i].name}</a>
                    </p>
                    <span>¥${this.res[i].price}</span>
                </li>`
            }
            this.foodO.innerHTML = str;
        }
        displayT(){
            let str = "";
            for (let i=0;i<this.res.length;i++){
                str += `<li index="${this.res[i].goodsId}">
 <a class="img" href="" target="_blank">
                                <img alt="" src="${this.res[i].img}">
                            </a>
                            <p class="title">
                                <a href="" target="_blank">${this.res[i].name}</a>
                            </p>
                            <span>${this.res[i].price}</span>
                            <i class="addCar">加入购物车</i>
</li>`
            }
            this.foodT.innerHTML = str;
        }
        displayS(){
            let str = "";
            for (let i=0;i<this.res.length;i++){
                str += `<li index="${this.res[i].goodsId}">
 <a class="img" href="" target="_blank">
                                <img alt="" src="${this.res[i].img}">
                            </a>
                            <p class="title">
                                <a href="" target="_blank">${this.res[i].name}</a>
                            </p>
                            <span>${this.res[i].price}</span>
                            <i class="addCar">加入购物车</i>
</li>`
            }
            this.foodS.innerHTML = str;
        }
        addEvent(){
            var that = this;
            window.scroll = function () {
that.scroll()
            };

            this.foodT.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className === "addCar"){
                    that.id = target.parentNode.getAttribute("index");
                    that.setCookie();
                }
            });
            this.foodS.addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.className === "addCar"){
                    that.id = target.parentNode.getAttribute("index");
                    that.setCookie();
                }
            })
        }
        // scroll(){
        //     this.scrollT = document.documentElement.scrollTop;
        //     console.log(this.scrollT);
        //     if(this.scrollT>1100){
        //         this.addCar_b.style.display = "block";
        //     }if (this.scrollT<1100){
        //         this.addCar_b.style.display = "none";
        //     }
        // }
        setCookie(){
            this.goods = getCookie("goodsCookie") ? JSON.parse(getCookie("goodsCookie")) : [];
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
            setCookie("goodsCookie",JSON.stringify(this.goods))
        }
    }
    new  List;
})();