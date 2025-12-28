<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">All Students</h2>
        <p class="text-sm text-gray-500 mt-1">Manage students across all classes</p>
      </div>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        <Icon icon="mdi:plus" />
        Add Student
      </button>
    </div>

    <!-- TODO: Add students table/list here -->
    <div class="text-center py-12 text-gray-400">
      <Icon icon="mdi:account-group" class="text-6xl mx-auto mb-4" />
      <p>Students management content will go here</p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
