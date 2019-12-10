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
            str += `<li></li>`
        }
    }
}
new  List();
})();