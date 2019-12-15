require.config({
//	配置模块的基础目录
    baseUrl:"module",
//	设置模块的别名
    paths:{
        login:"login",
        search:"search",
        partsA:"particulars",
    }
});
require(["login","search","partsA"],(login,search,partsA)=>{
    new login();
    new search ();
    new partsA ();
    console.log("所有模块加载完成");
});