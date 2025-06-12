import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ServicesPage from './pages/ServicesPage.vue'
import PortfolioPage from './pages/PortfolioPage.vue'
import BlogPage from './pages/BlogPage.vue'
import ContactPage from './pages/ContactPage.vue'
import BlogPostPage from './pages/BlogPostPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage
      },
      {
        path: 'about',
        name: 'about',
        component: AboutPage
      },
      {
        path: 'services',
        name: 'services',
        component: ServicesPage
      },
      {
        path: 'portfolio',
        name: 'portfolio',
        component: PortfolioPage
      },      {
        path: 'blog',
        name: 'blog',
        component: BlogPage
      },
      {
        path: 'blog/:id',
        name: 'blog-post',
        component: BlogPostPage
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
