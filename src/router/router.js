//生成路由
import React, { Component } from 'react';
import Login from '@/components/loginPage/login';
import Project from '@/components/projectPage/projectHome';
import FileInside from '@/components/projectPage/fileDetail/fileInside';

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
        path:'/project/:fileId/tasks',
        title:'项目',
        component:Project  
    }        
    
    
]