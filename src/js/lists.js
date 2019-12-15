require.config({
//	配置模块的基础目录
    baseUrl:"module",
//	设置模块的别名
    paths:{
        login:"login",
        search:"search",
        listA:"list",
    }
});
require(["login","search","listA"],(login,search,listA)=>{
    new login();
    new search ();
    new listA ();
    console.log("所有模块加载完成");
});