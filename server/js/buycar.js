require.config({
//	配置模块的基础目录
    baseUrl:"module",
//	设置模块的别名
    paths:{
        car:"car",
        user:"login"
    }
});


require(["car","user"],(car,login)=>{
    new login();
    new car ();
    console.log("所有模块加载完成");
});
