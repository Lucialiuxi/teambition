//生成路由
import Login from '@/components/loginPage/login';
import Project from '@/components/projectPage/projectHome';

export let routes = [
    {
        path:'/login',
        title:'登录',
        component:Login
    },
    {
        path:'/projects',
        title:'项目',
        component:Project
    },
    {
        path:'/project/:fileId/:t',
        title:'项目',
        component:Project  
    }
]