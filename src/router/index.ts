import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import SearchResult from '../pages/SearchResult.vue';
import Masonry from '../pages/Masonry.vue';

const routes = [
  {
    path: '/',
    name: 'Gallery',
    component: Home,
  },
  {
    path: '/search/:query',
    name: 'SearchResults',
    component: SearchResult,
    props: true, // This allows passing the query as a prop to the component
  },
  {
    path: '/masonry',
    name: 'Masonry',
    component: Masonry,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
