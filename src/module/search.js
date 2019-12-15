define(()=> {
    class Search{
        constructor(){
            this.btn=document.querySelector(".search .btn");
            this.txt=document.querySelector(".search .txt");
            this.addEvent();
        }
        addEvent(){
            this.btn.onclick=()=>{
                location.href=encodeURI("http://localhost:844/list.html?name=" + this.txt.value);
            }
        }
    }
    return Search;
});