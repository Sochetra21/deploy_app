<template>
  <div class="flex h-screen bg-gray-50 font-sans overflow-hidden">
    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileSidebarOpen"
        @click="mobileSidebarOpen = false"
        class="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:relative z-30 h-full bg-white border-r border-gray-200 flex flex-col shadow-lg md:shadow-none transition-all duration-300 ease-in-out',
        sidebarCollapsed ? 'w-20 -translate-x-full md:translate-x-0' : 'w-64',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Logo Area -->
      <div
        class="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-100 shrink-0"
      >
        <div
          class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shrink-0"
        >
          <Icon icon="mdi:school" class="text-white text-2xl" />
        </div>
        <Transition
          enter-active-class="transition-opacity duration-200"
          leave-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <div
            v-if="!sidebarCollapsed"
            class="ml-3 flex flex-col overflow-hidden whitespace-nowrap"
          >
            <span class="font-bold text-lg text-gray-800 tracking-tight">EduPortal</span>
            <span class="text-xs text-gray-500 font-medium">Admin Panel</span>
          </div>
        </Transition>
      </div>

      <!-- Navigation -->
      <!-- In AdminLayout.vue - Update the Navigation section -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        <div class="space-y-1 px-3">
          <!-- Dashboard -->
          <router-link
            to="/admin/dashboard"
            :class="navLinkClass('/admin/dashboard')"
            @click="closeMobileSidebar"
          >
            <Icon
              icon="mdi:view-dashboard"
              :class="navIconClass('/admin/dashboard')"
              aria-hidden="true"
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Dashboard
            </span>
          </router-link>

          <!-- Section Divider with Improved Accessibility -->
          <div
            v-if="!sidebarCollapsed"
            class="relative my-6"
            role="separator"
            aria-label="Student management section"
          >
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span
                class="px-3 bg-white text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student Management
              </span>
            </div>
          </div>

          <!-- Alternative Minimal Divider (if sidebar is collapsed) -->
          <div v-else class="my-6 flex justify-center">
            <div class="h-px w-8 bg-gray-200"></div>
          </div>

          <!-- Students Management -->
          <router-link
            to="/admin/students"
            :class="navLinkClass('/admin/students')"
            @click="closeMobileSidebar"
          >
            <Icon
              icon="mdi:account-group"
              :class="navIconClass('/admin/students')"
              aria-hidden="true"
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Students
            </span>
          </router-link>
        </div>

        <!-- Bottom Actions - Improved with aria-label -->
        <div
          class="mt-auto border-t border-gray-100 pt-4 px-3"
          role="navigation"
          aria-label="Account actions"
        >
          <button
            @click="logout"
            class="w-full flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            aria-label="Logout"
          >
            <Icon icon="mdi:logout" class="text-xl shrink-0" aria-hidden="true" />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Logout
            </span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <header
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10"
      >
        <div class="flex items-center gap-4">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
          >
            <Icon icon="mdi:menu" class="text-2xl" />
          </button>

          <nav class="hidden md:flex items-center text-sm text-gray-500">
            <span class="flex items-center text-indigo-600 font-medium">
              <Icon icon="mdi:home" class="mr-1" /> Admin
            </span>
            <Icon icon="mdi:chevron-right" class="mx-2 text-gray-400" />
            <span class="font-medium text-gray-800">{{ route.meta?.title }}</span>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <div
            class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
          >
            <div
              class="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            >
              A
            </div>
            <div class="hidden md:block text-right">
              <p class="text-sm font-semibold text-gray-800 leading-none">Admin User</p>
              <p class="text-xs text-gray-500 mt-1">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <div :key="route.path" class="mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ route.meta?.title }}</h1>
            <p class="text-gray-500 mt-2">{{ route.meta?.description }}</p>
          </div>
        </Transition>

        <Transition name="fade-slide" mode="out-in">
          <router-view :key="route.path" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

const closeMobileSidebar = () => {
  if (window.innerWidth < 768) {
    mobileSidebarOpen.value = false
  }
}

const navLinkClass = (path) => {
  return [
    'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
    route.path === path
      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  ]
}

const navIconClass = (path) => {
  return [
    'text-xl shrink-0 transition-colors',
    route.path === path ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600',
  ]
}

const logout = () => {
  // Supabase logout will go here
  router.push('/login')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
