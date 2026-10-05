<template>
  <q-editor
    :model-value="modelValue"
    @update:model-value="v => emit('update:modelValue', v)"
    min-height="14rem"
    :toolbar="[
      ['bold', 'italic', 'underline', 'strike'],
      [{ label: 'Heading', icon: 'title', list: 'no-icons',
         options: ['h2', 'h3', 'h4', 'p'] }],
      ['unordered', 'ordered', 'quote'],
      ['link', 'hr'],
      ['left', 'center', 'right', 'justify'],
      ['undo', 'redo', 'removeFormat', 'viewsource'],
    ]"
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

