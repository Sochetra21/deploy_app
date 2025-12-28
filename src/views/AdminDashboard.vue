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
            <span class="text-xs text-gray-500 font-medium">Admin Dashboard</span>
          </div>
        </Transition>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        <div class="space-y-1 px-3">
          <!-- Dashboard Link -->
          <button
            @click="setActivePage('dashboard')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:view-dashboard"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'dashboard'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Dashboard
            </span>
          </button>

          <!-- Student Management Section -->
          <div class="py-4">
            <div class="flex items-center gap-2 px-2">
              <div
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
              <span
                v-if="!sidebarCollapsed"
                class="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
              >
                Student Management
              </span>
              <div
                v-if="!sidebarCollapsed"
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
            </div>
          </div>

          <!-- Students Link -->
          <button
            @click="setActivePage('students')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'students'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:account-group"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'students'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Students
            </span>
          </button>

          <!-- Exams Link -->
          <button
            @click="setActivePage('exams')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'exams'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:file-document"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'exams'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Exams
            </span>
          </button>

          <!-- Attendance Link -->
          <button
            @click="setActivePage('attendance')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'attendance'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:clipboard-check"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'attendance'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Attendance
            </span>
          </button>

          <!-- Teacher Management Section -->
          <div class="py-4">
            <div class="flex items-center gap-2 px-2">
              <div
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
              <span
                v-if="!sidebarCollapsed"
                class="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
              >
                Teacher Management
              </span>
              <div
                v-if="!sidebarCollapsed"
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
            </div>
          </div>

          <!-- Teachers Link -->
          <button
            @click="setActivePage('teachers')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'teachers'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:teacher"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'teachers'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Teachers
            </span>
          </button>

          <!-- Class Management Section -->
          <div class="py-4">
            <div class="flex items-center gap-2 px-2">
              <div
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
              <span
                v-if="!sidebarCollapsed"
                class="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
              >
                Class Management
              </span>
              <div
                v-if="!sidebarCollapsed"
                class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              ></div>
            </div>
          </div>

          <!-- Classes Link -->
          <button
            @click="setActivePage('classes')"
            :class="[
              'w-full flex items-center p-3 rounded-xl transition-all duration-200 group',
              activePage === 'classes'
                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <Icon
              icon="mdi:google-classroom"
              class="text-xl shrink-0 transition-colors"
              :class="
                activePage === 'classes'
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-gray-600'
              "
            />
            <span
              v-if="!sidebarCollapsed"
              class="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all"
            >
              Classes
            </span>
          </button>
        </div>

        <!-- Bottom Actions -->
        <div class="mt-auto border-t border-gray-100 pt-4 px-3">
          <button
            @click="logout"
            class="w-full flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group"
          >
            <Icon icon="mdi:logout" class="text-xl shrink-0" />
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

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <header
        class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-10"
      >
        <div class="flex items-center gap-4">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors focus:outline-none"
          >
            <Icon icon="mdi:menu" class="text-2xl" />
          </button>

          <!-- Breadcrumb -->
          <nav class="hidden md:flex items-center text-sm text-gray-500">
            <span class="flex items-center text-indigo-600 font-medium">
              <Icon icon="mdi:home" class="mr-1" /> Home
            </span>
            <Icon icon="mdi:chevron-right" class="mx-2 text-gray-400" />
            <span class="font-medium text-gray-800">{{ currentPageTitle }}</span>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <!-- Notifications -->
          <button
            class="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <Icon icon="mdi:bell-outline" class="text-2xl" />
            <span
              v-if="unreadNotifications > 0"
              class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
            ></span>
          </button>

          <!-- Profile -->
          <div
            class="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
          >
            <div
              class="w-9 h-9 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            >
              A
            </div>
            <div class="hidden md:block text-right">
              <p class="text-sm font-semibold text-gray-800 leading-none">Admin User</p>
              <p class="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Scrollable Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8 relative">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
          mode="out-in"
        >
          <!-- Dynamic Page Header -->
          <div :key="'header-' + activePage" class="mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ currentPageTitle }}</h1>
            <p class="text-gray-500 mt-2">{{ currentPageDescription }}</p>
          </div>
        </Transition>

        <!-- Dynamic Content Component -->
        <Transition name="fade-slide" mode="out-in">
          <component :is="activeComponent" :key="activePage" />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, shallowRef } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

// NOTE: Ensure these components exist in your project or replace with placeholders
import DashboardContent from '@/components/admin/DashboardContent.vue'
import StudentsExams from '@/components/admin/StudentsExams.vue'
import StudentsAttendance from '@/components/admin/StudentsAttendance.vue'
import TeachersManagement from '@/components/admin/TeachersManagement.vue'

const router = useRouter()

// --- State ---
const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)
const activePage = ref('dashboard')
const unreadNotifications = ref(3)

// --- Component Mapping ---
const componentMap = {
  dashboard: DashboardContent,
  students: DashboardContent, // Replace with actual StudentsManagement component
  exams: StudentsExams,
  attendance: StudentsAttendance,
  teachers: TeachersManagement,
  classes: DashboardContent, // Replace with actual ClassesManagement component
}

const activeComponent = computed(() => componentMap[activePage.value] || DashboardContent)

// --- Computed ---
const currentPageTitle = computed(() => {
  const titles = {
    dashboard: 'Dashboard',
    students: 'Students',
    exams: 'Exams',
    attendance: 'Attendance',
    teachers: 'Teachers',
    classes: 'Classes',
  }
  return titles[activePage.value] || 'Dashboard'
})

const currentPageDescription = computed(() => {
  const descriptions = {
    dashboard: 'Overview of your education portal',
    students: 'Manage student profiles and information',
    exams: 'Manage and track student exam results',
    attendance: 'Monitor student attendance records',
    teachers: 'Manage teaching staff and profiles',
    classes: 'Manage classes and schedules',
  }
  return descriptions[activePage.value] || ''
})

// --- Methods ---
const toggleSidebar = () => {
  // Check if mobile or desktop view
  if (window.innerWidth < 768) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

const setActivePage = (page) => {
  activePage.value = page
  // On mobile, close sidebar after selection
  if (window.innerWidth < 768) {
    mobileSidebarOpen.value = false
  }
}

const logout = () => {
  // Implement logout logic
  alert('Logging out...')
  // router.push('/')
}
</script>

<style scoped>
/* Custom Scrollbar for Sidebar */
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
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Page Transition Animation */
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
