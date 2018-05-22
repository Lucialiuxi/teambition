//生成路由
import React, { Component } from 'react';
import Login from '@/components/loginPage/login';
import Project from '@/components/projectPage/projectHome';

export let routes = [
    {
        path:'/login',
        title:'登录',
        component:Login
    },
    {
        path:'/project',
        title:'项目',
        component:Project
    }
]