// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Auth
import Login from '../views/auth/LoginView.vue'

// Setup (Standalone - No Layout)
import AcademicYearSetup from '../views/admin/AcademicYearSetup.vue'

// Admin
import AdminLayout from '../views/layouts/AdminLayout.vue'
import AdminDashboard from '@/views/admin/Dashboard.vue'
import StudentsManagement from '@/views/admin/StudentsManagement.vue'

// Teacher
import TeacherLayout from '../views/layouts/TeacherLayout.vue'
import TeacherDashboard from '@/views/teacher/Dashboard.vue'
import MyStudents from '@/views/teacher/MyStudents.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  // Academic Year Setup (Standalone - No sidebar)
  {
    path: '/admin/academic-year',
    name: 'AcademicYearSetup',
    component: AcademicYearSetup,
  },

  // Admin Routes (With sidebar)
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: {
          title: 'Dashboard',
          description: 'Overview of your education portal',
        },
      },
      {
        path: 'students',
        name: 'StudentsManagement',
        component: StudentsManagement,
        meta: {
          title: 'Students Management',
          description: 'Manage all students in the system',
        },
      },
    ],
  },

  // Teacher Routes (With sidebar)
  {
    path: '/teacher',
    component: TeacherLayout,
    redirect: '/teacher/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'TeacherDashboard',
        component: TeacherDashboard,
        meta: {
          title: 'Dashboard',
          description: 'Welcome to your teaching portal',
        },
      },
      {
        path: 'my-students',
        name: 'MyStudents',
        component: MyStudents,
        meta: {
          title: 'My Students',
          description: 'View and manage your students',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
