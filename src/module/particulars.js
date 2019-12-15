define(()=>{
    class Particulars{
        constructor() {
            this.mall=document.querySelector(".mall");
            this.top_name=document.querySelector(".top_name");
            this.evaluation=document.querySelector(".evaluation");
            this.spx_ul=document.querySelector(".spx_ul");
            this.line=document.querySelector(".line");
            this.product_b=document.querySelector(".product_b");
            this.group_name=document.getElementById("shop_group_name");
            this.total_num=document.getElementById("total_num");
            this.sBox = document.querySelector(".product_t");
            this.bBox = document.querySelector(".bbox");
            this.add = document.getElementById("add");
            this.minus = document.getElementById("minus");
            this.number = document.querySelector(".number_input");
            this.url="http://localhost:844/data/goods.json";
            this.init();

        }
        init(){
            ajaxGet(this.url,(res)=>{
                this.res=JSON.parse(res);
                this.app();
            });
            this.id=location.search;
            let reg=/\?id=(.*)/;
            this.goods=reg.exec(this.id)?reg.exec(this.id)[1]:reg.exec(this.id);
            this.addEvent();
        }
        app(){
            let type=0;
            for(var i=0;i<this.res.length;i++){
                if(this.goods===this.res[i].goodsId){
                    type=1;
                    this.display(this.res[i]);
                }
            }
            if(type===0){
                location.href="http://localhost:844/index.html";
            }
        }
        display(res){
            console.log(res);
            this.top_name.innerHTML = `${res.name}`;
            this.sBox.innerHTML = `<img src="${res.img}" alt="">
<span class="product_img"></span>`;
            this.product_b.innerHTML = `<img src="${res.img}" alt="">`;
            this.group_name.innerHTML = `${res.name}`;
            this.sBox.innerHTML = `<img src="${res.img}" alt="">
            <span class="product_img"></span>`;
            this.bBox.innerHTML = `<img src="${res.img}" alt="">`;
            this.mall.innerHTML = `${res.price}`;
            this.total_num.innerHTML = `${res.pj}`;
            this.spx_ul.innerHTML = `
                    <li class="title">商品名称:${res.name}</li>
                    <li>商品编号：${res.goodsId}</li>
                    <li>上架时间：${res.time}</li>
                    <li>品牌：${res.brand}</li>
                    <li>规格：${res.standard}</li>
                    <li>产地：${res.origin}</li>`;
            this.sSpan = document.querySelector(".product_t .product_img");
            this.bImg = document.querySelector(".bbox img");
            console.log(this.sSpan);
            this.bigX();
        }
        addEvent(){
            this.add.onclick=()=>{
                let val=this.number.value;
                val++;
                this.number.value=val;
            };
            this.minus.onclick=()=>{
                let val=this.number.value;
                if(val<=1){
                    val=2;
                }
                val--;
                this.number.value=val;
            }
        }
        bigX(){
            var that = this;
            this.sBox.onmouseover = function(){
                that.over()
            };
            this.sBox.onmousemove = function(eve){
                var e = eve || window.event;
                that.move(e)
            };
            this.sBox.onmouseout = function(){
                that.out();
            }
        }
        over(){
            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";
            this.sSpanW = (this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth);
            this.sSpanH = (this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight);
            this.sSpan.style.width = this.sSpanW + "px";
            this.sSpan.style.height = this.sSpanH + "px";
            this.sW = this.sBox.offsetWidth;
            this.sH = this.sBox.offsetHeight;
            this.bW = this.bBox.offsetWidth;
            this.bH = this.bBox.offsetHeight;
            this.bImgW = this.bImg.offsetWidth;
            this.bImgH = this.bImg.offsetHeight;
        }
        move(e){
            var w = this.sBox.parentElement;
            console.log(w.offsetLeft);
            var l = e.clientX - w.offsetLeft - this.sSpan.offsetWidth/2;
            var t = e.clientY - w.offsetTop - this.sSpan.offsetHeight/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l>this.sW - this.sSpanW){
                l = this.sW - this.sSpanW;
            }
            if(t>this.sH - this.sSpanH){
                t = this.sH - this.sSpanH;
            }
            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";
            this.bImg.style.left = l / (this.sW - this.sSpanW) * (this.bW - this.bImgW) + "px";
            this.bImg.style.top = t / (this.sH - this.sSpanH) * (this.bH - this.bImgH) + "px";
        }
        out(){
            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }
    return  Particulars;
});
