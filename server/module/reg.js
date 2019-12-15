;(function(){
    "use strict";
    class Reg{
    constructor() {
        this.user = document.getElementById("user");
        this.pass = document.getElementById("pass1");
        this.pass2 = document.getElementById("pass2");
        this.tel = document.getElementById("tel");
        this.xy = document.getElementById("agreement");
        this.suc = document.getElementById("success");
        this.regin = document.getElementById("regin");
        this.user_msg = document.querySelector(".user_msg");
        this.pass_msg = document.querySelector(".pass_msg");
        this.qr_pass = document.querySelector(".qr_pass");
        this.tel_msg = document.querySelector(".tel_msg");
        this.qr_xy = document.querySelector(".qr_xy");
        this.init();
    }
    init(){
        this.regin.onclick=()=>{
            this.u =this.user.value;
            this.p =this.pass.value;
            this.p2 =this.pass2.value;
            this.t =this.tel.value;
            this.register();
        }
    }
    register(){
        let reg_u = /^[a-z0-9_-]{6,20}$/;
        let u = reg_u.test(this.n);
        if(!u){
            this.user_msg.innerHTML="用户名格式不正确";
        }else{
            this.user_msg.innerHTML="";
        }
        let reg_p = /^[a-z0-9_-]{6,20}$/;
        var p = reg_p.test(this.p);
        if(!p){
            this.pass_msg.innerHTML="密码格式不正确";
        }else{
            this.pass_msg.innerHTML="";
        }
        if(this.p2!==this.p){
            this.qr_pass.innerHTML = "两次输入的密码不一致！"
        }
        let reg_t = /^1\d{10}$/;
        let t = reg_t.test(this.t);
        if(!t){
            this.tel_msg.innerHTML="请输入正确电话号码！";
        }else{
            this.tel_msg.innerHTML="";
        }
        let xy = this.xy.checked;
        if(!xy){
            this.qr_xy.innerHTML="请阅读并勾选用户服务协议！";
        }else{
            this.qr_xy.innerHTML="";
        }
        if(u&&p&&this.p2&&t&&xy){
            this.setM()
        }
    }
    setM(){
        this.msg = getCookie("user") ? JSON.parse(getCookie("user")) : [];
        if (this.msg.length<1){
            this.msg.push({
                user:this.u,
                pass:this.p,
                onoff:0
            });
            this.success();
        }else{
            let type = this.msg.some((val,idx)=>{
                return val.user === this.u;
            });
            if (type){
                alert("用户名已被注册！")
            }else{
                this.msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                });
                this.success();
            }
        }
        setCookie("user",JSON.stringify(this.msg));
    }
    success(){
        this.suc.style.display = "block";
        setTimeout(()=>{
            location.href = "localhost:844/log.html"
        },2000)
    }
}
    return Reg;
})();

