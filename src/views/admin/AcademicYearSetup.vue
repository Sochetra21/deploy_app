<!-- views/setup/AcademicYearSetup.vue -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4"
  >
    <div class="max-w-4xl w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Icon icon="mdi:calendar-range" class="text-indigo-600 text-3xl" />
        </div>
        <h1 class="text-3xl font-bold text-white">Academic Years</h1>
        <p class="text-indigo-100 mt-2">Select an academic year to continue</p>
      </div>

      <!-- Academic Year Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <!-- Existing Academic Year Cards -->
        <div
          v-for="year in academicYears"
          :key="year.id"
          @click="selectAcademicYear(year)"
          class="bg-white rounded-2xl shadow-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-2xl"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Icon icon="mdi:calendar" class="text-indigo-600 text-2xl" />
            </div>
            <span
              v-if="year.is_active"
              class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
            >
              Active
            </span>
          </div>

          <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ year.name }}</h3>

          <div class="space-y-2">
            <div class="flex items-center text-sm text-gray-600">
              <Icon icon="mdi:calendar-start" class="mr-2 text-lg text-gray-400" />
              <span>Start: {{ formatDate(year.start_date) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Icon icon="mdi:calendar-end" class="mr-2 text-lg text-gray-400" />
              <span>End: {{ formatDate(year.end_date) }}</span>
            </div>
          </div>
        </div>

        <!-- Create New Academic Year Card -->
        <div
          @click="showCreateForm = true"
          class="bg-white/20 backdrop-blur-sm border-2 border-white/30 border-dashed rounded-2xl shadow-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-200 hover:bg-white/30 flex flex-col items-center justify-center min-h-[200px]"
        >
          <div class="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mb-4">
            <Icon icon="mdi:plus" class="text-white text-4xl" />
          </div>
          <p class="text-white font-semibold text-lg">Create New Year</p>
          <p class="text-indigo-100 text-sm mt-1">Add academic year</p>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="text-center">
        <button @click="logout" class="text-white/80 hover:text-white text-sm transition-colors">
          Logout
        </button>
      </div>
    </div>

    <!-- Create Form Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showCreateForm"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="showCreateForm = false"
      >
        <div
          class="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            @click="showCreateForm = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="mdi:close" class="text-2xl" />
          </button>

          <!-- Header -->
          <div class="text-center mb-8">
            <div
              class="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Icon icon="mdi:calendar-range" class="text-white text-3xl" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">Create Academic Year</h2>
            <p class="text-gray-500 mt-2">Set up your new academic year</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="createAcademicYear" class="space-y-6">
            <!-- Academic Year Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Academic Year <span class="text-red-500">*</span>
              </label>
              <input
                v-model="academicYear"
                type="text"
                required
                placeholder="e.g., 2025-2026"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">Format: YYYY-YYYY</p>
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Start Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="startDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                End Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="endDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <!-- Terms/Semesters -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Number of Terms/Semesters <span class="text-red-500">*</span>
              </label>
              <select
                v-model="numberOfTerms"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="2">2 Semesters</option>
                <option value="3">3 Trimesters</option>
                <option value="4">4 Quarters</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                v-model="description"
                rows="3"
                placeholder="Add any notes about this academic year..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4">
              <button
                type="button"
                @click="showCreateForm = false"
                class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:check-circle" class="text-xl" />
                Create & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const showCreateForm = ref(false)

// Existing Academic Years (TODO: Load from Supabase)
const academicYears = ref([
  {
    id: 1,
    name: '2024-2025',
    start_date: '2024-09-01',
    end_date: '2025-06-30',
    is_active: false,
  },
  {
    id: 2,
    name: '2025-2026',
    start_date: '2025-09-01',
    end_date: '2026-06-30',
    is_active: true,
  },
])

// Form data
const academicYear = ref('')
const startDate = ref('')
const endDate = ref('')
const numberOfTerms = ref('2')
const description = ref('')

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Select existing academic year
const selectAcademicYear = (year) => {
  // TODO: Set active academic year in Supabase/Store
  console.log('Selected Academic Year:', year)
  router.push('/admin/dashboard')
}

// Create new academic year
const createAcademicYear = async () => {
  // TODO: Save to Supabase
  // const { data, error } = await supabase
  //   .from('academic_years')
  //   .insert({
  //     name: academicYear.value,
  //     start_date: startDate.value,
  //     end_date: endDate.value,
  //     number_of_terms: numberOfTerms.value,
  //     description: description.value,
  //     is_active: true
  //   })

  console.log('Academic Year Created:', {
    name: academicYear.value,
    start_date: startDate.value,
    end_date: endDate.value,
    number_of_terms: numberOfTerms.value,
    description: description.value,
  })

  // Close form and navigate
  showCreateForm.value = false
  router.push('/admin/dashboard')
}

const logout = () => {
  // TODO: Supabase logout
  router.push('/login')
}
</script>
