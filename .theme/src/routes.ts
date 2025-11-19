import type { Route } from 'vitepress'
import type { Component } from 'vue'
import About from './pages/About.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import Post from './pages/Post.vue'
import Search from './pages/Search.vue'
import Tags from './pages/Tags.vue'

interface RouteItem {
  match: RegExp | string | ((route: Route) => boolean)
  layout?: Component
  component: Component
  meta?: Record<string, any>
}

export const routes: RouteItem[] = [
  {
    match: '/',
    component: Home,
  },
  {
    match: /^\/(post|draft)s?\//,
    component: Post,
  },
  {
    match: '/about',
    component: About,
  },
  {
    match: '/tags',
    component: Tags,
  },
  {
    match: /^\/tags\//,
    component: Tags,
  },
  {
    match: '/search',
    component: Search,
  },
]

export function getRouteComponent(route: Route) {
  for (const item of routes) {
    if (!isMatchRoute(item, route)) {
      continue
    }

    return item.component
  }

  return NotFound
}

function isMatchRoute(item: RouteItem, route: Route): boolean {
  if (typeof item.match === 'string') {
    return item.match === route.path
  }

  if (item.match instanceof RegExp) {
    return item.match.test(route.path)
  }

  return item.match(route)
}
