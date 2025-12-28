<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4"
  >
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <Icon icon="mdi:school" class="text-white text-3xl" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">EduPortal</h1>
        <p class="text-gray-500 mt-2">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Login As</label>
          <select
            v-model="role"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const role = ref('admin')

const handleLogin = async () => {
  // TODO: Replace with Supabase authentication
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email: email.value,
  //   password: password.value
  // })

  // For now, simulate login and route based on role
  if (role.value === 'admin') {
    router.push('/admin/academic-year') // Admin goes to Academic Year first
  } else {
    router.push('/teacher/dashboard') // Teacher goes to Dashboard
  }
}
</script>
