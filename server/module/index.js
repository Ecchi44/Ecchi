define(()=>{
    class Index{
    constructor() {
        this.url = "http://localhost:844/data/goods.json";
        this.foodO = document.querySelector(".food_t");
        this.foodT = document.querySelector(".foods2");
        this.foodS = document.querySelector(".foods3");
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
                    <a href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank" class="img">
                        <img src="${this.res[i].img}" alt="">
                    </a>
                    <p>
                        <a href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank">${this.res[i].name}</a>
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
 <a class="img" href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank">
                                <img alt="" src="${this.res[i].img}">
                            </a>
                            <p class="title">
                                <a href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank">${this.res[i].name}</a>
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
 <a class="img" href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank">
                                <img alt="" src="${this.res[i].img}">
                            </a>
                            <p class="title">
                                <a href="http://localhost:844/particulars.html?id=${this.res[i].goodsId}" target="_blank">${this.res[i].name}</a>
                            </p>
                            <span>${this.res[i].price}</span>
                            <i class="addCar">加入购物车</i>
</li>`
        }
        this.foodS.innerHTML = str;
    }
    addEvent(){
        var that = this;
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
return  Index;
});

