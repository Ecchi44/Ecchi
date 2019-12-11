;(function () {
    "use strict";
    class Index{
        constructor() {
            this.login = document.querySelector(".logreg");
            this.welcome = document.querySelector(".welcome");
            this.user = this.welcome.querySelector(".user_n");
            this.exit = this.welcome.querySelector(".tc_dl");
            this.getMsg();
            this.addEvent();

        }
        addEvent(){
            let that = this;
            this.exit.onclick = function(){
                that.msg[that.i].onoff = "0";
                setCookie("userMsg",JSON.stringify(that.msg));
                location.reload();
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            this.i = null;
            var type = this.msg.some((value,index)=> {
                this.i = index;
                return value.onoff === 1;
            });
            if (type){
                this.login.style.display = "none";
                this.welcome.style.display = "block";
                this.user.innerHTML = this.msg[this.i].user;
            }else {
                location.href = "./log.html"
            }
        }
    }
    new Index;
})();