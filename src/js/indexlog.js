require.config({
//	配置模块的基础目录
    baseUrl:"module",
//	设置模块的别名
    paths:{
        login:"login",
        index:"index",
        search:"search"
    }
});


require(["login","search","index"],(login,search,index)=>{
    new login();
    new search();
    new index ();
    console.log("所有模块加载完成");
});
