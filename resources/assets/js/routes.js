import Vue from 'vue';
import VueRouter from 'vue-router';

import Signin from './components/signin/Signin.vue';
import Dashboard from './components/dashboard/Dashboard.vue';
import ArticlesList from './components/articles/List.vue';
import ExhibitionsNews from './components/news/Exhibitions.vue';
import CreateArticle from './components/articles/Create.vue';
import CreateBaseInfo from './components/baseinfo/Create.vue';
import EditArticle from './components/articles/Edit.vue';
import EditBaseInfo from './components/baseinfo/Edit.vue';
import EditProduct from './components/product/Edit.vue';
import CreateProduct from './components/product/Create.vue';
import EditDownload from './components/download/Edit.vue';
import CreateDownload from './components/download/Create.vue';
import CreateCategory from './components/category/Create.vue';
import EditSite from './components/site/Edit.vue';

123456

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [
      {
        path: '/',
        component: Signin,
        meta: { requiresGuest: true }
      },
      {
        path: '/dashboard',
        component: Dashboard,
        // redirect: '/company_news',
        children: [
          {
            path: 'articles/:id',  // 对应文章的目录
            component: ArticlesList,
            meta: { requiresAuth: true },
            name: 'loadArticlesList'
          },
          {
            path: 'articles/create/:categoryId',  // 对指定的目录创建新的文章
            component: CreateArticle,
            meta: { requiresAuth: true },
            name: 'CreateArticle'
          },
          {
            path: 'baseinfo/create/:categoryId',  // 对指定的目录创建新的文章
            component: CreateBaseInfo,
            meta: { requiresAuth: true },
            name: 'CreateBaseInfo'
          },
          {
            path: 'site/edit',  // 对网站基本信息进行编辑修改
            component: EditSite,
            meta: { requiresAuth: true },
            name: 'EditSite'
          },
          {
            path: 'category/create',  // 加载添加目录的界面
            component: CreateCategory,
            meta: { requiresAuth: true },
            name: 'CreateCategory'
          },
          {
            path: 'product/create/:categoryId',  // 对指定的目录创建新的文章
            component: CreateProduct,
            meta: { requiresAuth: true },
            name: 'CreateProduct'
          },
          {
            path: 'download/create/:categoryId',  // 对指定的目录创建新的文章
            component: CreateDownload,
            meta: { requiresAuth: true },
            name: 'CreateDownload'
          },
          {
            path: 'download/edit/:downloadId',  // 对指定的目录创建新的文章
            component: EditDownload,
            meta: { requiresAuth: true },
            name: 'EditDownload'
          },
          {
            path: 'articles/edit/:newsId',  // 对指定的目录创建新的文章
            component: EditArticle,
            meta: { requiresAuth: true },
            name: 'EditArticle'
          },
          {
            path: 'baseinfo/edit/:baseInfoId',  // 对指定的目录创建新的文章
            component: EditBaseInfo,
            meta: { requiresAuth: true },
            name: 'EditBaseInfo'
          },
          {
            path: 'product/edit/:productId',  // 对指定的目录创建新的文章
            component: EditProduct,
            meta: { requiresAuth: true },
            name: 'EditProduct'
          },
          {
            path: 'categories/:id',  // 对应产品的目录
            component: ExhibitionsNews
          }
        ]
      }
  ]
});

export default router;
