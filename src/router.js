
//IMPORTO createRouter e createWebHistory
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import ProjectList from './pages/ProjectList.vue';
import SingleProject from './pages/SingleProject.vue'

//DEFINISCO L'OGGETTO ROUTER
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage,
        },
        {
            path: '/projects',
            name: 'project_list',
            component: ProjectList,
        },
        {
            path: '/projects/:slug',
            name: 'single-project',
            component: SingleProject,
        },
    ]
});
export { router };