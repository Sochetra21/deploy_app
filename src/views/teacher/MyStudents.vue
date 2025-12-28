<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">My Students</h2>
        <p class="text-sm text-gray-500 mt-1">Students in your classes</p>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
        <Icon icon="mdi:account-group" class="text-green-600 text-lg" />
        <span class="text-sm font-medium text-green-700">Total: 45 Students</span>
      </div>
    </div>

    <!-- TODO: Add students list here -->
    <div class="text-center py-12 text-gray-400">
      <Icon icon="mdi:account-group" class="text-6xl mx-auto mb-4" />
      <p>My students content will go here</p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
