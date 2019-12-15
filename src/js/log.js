;(function(){
    "use strict";
    class Log{
    constructor() {
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass");
        this.log = document.getElementById("log");
        this.u_ero = document.querySelector(".user_error");
        this.p_ero = document.querySelector(".pass_error");
        this.addEvent();
    }
    addEvent(){
        let that = this;
        this.log.onclick =function () {
            that.u = that.user.value;
            that.p = that.pass.value;
            that.getM();
        }
    }
    getM(){
        this.msg = getCookie("user") ? JSON.parse(getCookie("user")) : [];
        let type = 0;
        for (let i=0;i<this.msg.length;i++){
            if (this.msg[i].user === this.u && this.msg[i].pass === this.p){
                location.href = "http://localhost:844/index.html";
                this.msg[i].onoff = 1;
                setCookie("user",JSON.stringify(this.msg));
                type = 1;
            }else if (this.msg[i].user === this.u && this.msg[i].pass !== this.p){
                this.p_ero.innerHTML = "密码输入错误！";
                type = 2;
            }
        }
        if (type === 0){
            this.u_ero.innerHTML = "用户名不存在！";
        }
    }
}
    new  Log;
})();
