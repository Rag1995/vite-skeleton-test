<script setup lang="ts">
import { useMyFetch } from '@/utils/fetch'
import { promiseTimeout } from '@vueuse/core'

interface Todo {
  userId: 1
  id: 1
  title: string
  completed: boolean
}

const { data, isFetching, execute } = useMyFetch('/todos/1', {
  immediate: false,
  beforeFetch: async () => {
    await promiseTimeout(1200)
  },
}).get().json<Todo>()
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div class="card">
    <!-- skeleton -->
    <template v-if="isFetching">
      <div class="skeleton skeleton-text skeleton-w-70"></div>
      <div class="skeleton skeleton-text skeleton-w-100"></div>
      <div class="skeleton skeleton-text skeleton-w-50"></div>
    </template>
    <!-- no data -->
    <template v-else-if="!data">
      No Data
    </template>
    <!-- data -->
    <template v-else>
      <div>
        User ID：<span>{{ data.userId }}</span>
      </div>
      <div>
        Title：<span>{{ data.title }}</span>
      </div>
      <div>
        Complete：
        <span>
          {{ data.completed ? '🟢' : '🔴' }}
        </span>
      </div>
    </template>
  </div>

  <button type="button" @click="execute()">
    Request API
  </button>
</template>

<style lang="postcss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
.card {
  margin-top: 1rem;
  margin-bottom: 3rem;
  background-color: #1a1a1a;
  border-radius: .5rem;
  text-align: start;
  height: 5rem;
}
.skeleton {
  position: relative;
  overflow: hidden;
  cursor: wait;
  background: rgba(#fff, .3);
  &::after {
    content: '';
    background: linear-gradient(90deg, transparent, rgba(#fff, .4), transparent);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    animation: skeleton-anim 1.25s infinite;
  }
  &-text {
    height: 1em;
    margin: .25rem 0;
    border-radius: .25rem;
  }
}
@keyframes skeleton-anim {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
@for $i from 0 to 10 {
  .skeleton-w-$(i)0 {
    width: calc($(i) * 10%);
  }
}
</style>
