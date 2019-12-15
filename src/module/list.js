define(()=>{
    class List{
        constructor(){
            this.url = "http://localhost:844/data/goods.json";
            this.list = document.querySelector(".list");
            this.page= document.querySelector(".lists");
            this.pgLeft = document.querySelector(".pgLeft");
            this.pgRight= document.querySelector(".pgRight");
            this.txt = document.querySelector(".search .txt");
            this.index = 0;
            let val = location.search;
            this.reg=/\?name=(.*)/;
            this.sear=this.reg.exec(val)?decodeURIComponent(this.reg.exec(val)[1]):"";
            this.txt.value=this.sear;
            this.init();
        }
        init(){
            ajaxGet(this.url,(res)=>{
                this.res=JSON.parse(res);
                for(var i=0;i<this.res.length;i++){
                    if(!this.res[i].name.includes(this.sear)){
                        this.res.splice(i,1);
                        i--;
                    }
                }
                this.displayO();
                this.displayT();
                this.addEvent();
            })
        }
        displayO(){
            let str = "";
            if(this.res.length<=0){
                str=`<h2 class="empty">没有搜索到符合的商品</h2>`;
            }else {
                for (var i = this.index * 5; i < (this.index + 1) * 5; i++) {
                    if (i >= this.res.length) break;
                    str += `<li index="${this.res[i].goodsId}">
            <a href="http://localhost:844/ost:844/particulars.html?id=${this.res[i].goodsId}"" class="show">
                <img src="${this.res[i].img}" alt="">
                <p>${this.res[i].name}</p>
                <span>¥${this.res[i].price}</span>
            </a>
        </li>`
                }
            }
            this.list.innerHTML=str;
        }
        displayT(){
            this.max=Math.ceil(this.res.length/5);
            let str="";
            for(var i=0;i<this.max;i++){
                str+=`<a href="#">${i+1}</a>`
            }
            this.page.innerHTML=str;
            this.listA=this.page.children;
            for(let i=0;i<this.listA.length;i++){
                this.listA[i].onclick=()=> {
                    this.index=i;
                    console.log(this.index);
                    this.displayO();
                    return false;
                }
            }
        }
        addEvent(){
            this.pgLeft.onclick=()=>{
                if(this.index===0){
                    this.index=0
                }else{
                    this.index--;
                }
                this.displayO();
                return false;
            };
            this.pgRight.onclick=()=>{
                if(this.index===this.max-1){
                    this.index=this.max-1
                }else{
                    this.index++;
                }
                this.displayO();
                return false;
            };
            let that = this;
            this.list.addEventListener("click",function(eve){
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if(target.className === "addCar"){
                    that.id = target.parentNode.getAttribute("index");
                    console.log( that.id);
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
    return List;
});