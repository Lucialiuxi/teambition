import React, { Component } from 'react';
import Login from '@/components/loginPage/login';
import Project from '@/components/projectPage/projectHome';

export let routes = [
    {
        path:'/',
        title:'根目录',
        redirect:null
    },
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