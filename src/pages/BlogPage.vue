`<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <!-- Blog Hero -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Insights and tips about content writing, SEO, and digital marketing.</p>
      </div>

      <!-- Featured Post -->
      <div v-if="featuredPost" class="mb-16">
        <div class="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
          <img :src="featuredPost.image" :alt="featuredPost.title" class="w-full h-96 object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div class="absolute bottom-0 p-8 text-white">
            <div class="flex items-center mb-4">
              <span class="bg-blue-600 text-sm px-3 py-1 rounded-full">{{ featuredPost.category }}</span>
              <span class="ml-4 text-sm opacity-75">{{ featuredPost.date }}</span>
            </div>
            <h2 class="text-3xl font-bold mb-4">{{ featuredPost.title }}</h2>
            <p class="text-lg opacity-90 mb-4">{{ featuredPost.excerpt }}</p>
            <router-link :to="{ name: 'blog-post', params: { slug: featuredPost.slug }}"
                       class="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Read More
            </router-link>
          </div>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" 
                :key="post.slug" 
                class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover rounded-t-lg">
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {{ post.category }}
              </span>
              <span class="text-gray-500 text-sm">{{ post.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ post.title }}</h3>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between">
              <router-link :to="{ name: 'blog-post', params: { slug: post.slug }}"
                         class="text-blue-600 hover:text-blue-800">
                Read More
              </router-link>
              <button @click="sharePost(post)"
                      class="text-gray-500 hover:text-gray-700">
                <ShareIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Newsletter Subscription -->
      <div class="mt-16 bg-blue-50 rounded-lg p-8">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-2xl font-bold mb-4">Subscribe to My Newsletter</h3>
          <p class="text-gray-600 mb-6">Get the latest content writing tips and insights delivered to your inbox.</p>
          <form @submit.prevent="subscribe" class="flex gap-4 max-w-md mx-auto">
            <input v-model="email" 
                   type="email" 
                   placeholder="Enter your email"
                   class="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button type="submit" 
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </form>
          <p v-if="subscriptionMessage" 
             :class="['mt-4', subscriptionSuccess ? 'text-green-600' : 'text-red-600']">
            {{ subscriptionMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShareIcon } from '@heroicons/vue/24/outline'

// Sample blog data
const featuredPost = {
  title: 'The Future of Content Writing in the AI Era',
  slug: 'future-of-content-writing-ai-era',
  category: 'Content Strategy',
  date: 'June 1, 2025',
  image: 'https://placeholder.com/1200x800',
  excerpt: 'Explore how artificial intelligence is transforming content creation and what it means for writers and businesses.'
}

const posts = [
  {
    title: '10 SEO Writing Tips for 2025',
    slug: 'seo-writing-tips-2025',
    category: 'SEO',
    date: 'May 28, 2025',
    image: 'https://placeholder.com/800x600',
    excerpt: 'Learn the latest SEO writing techniques to help your content rank better in search engines.'
  },
  {
    title: 'Creating Content That Converts',
    slug: 'content-that-converts',
    category: 'Marketing',
    date: 'May 25, 2025',
    image: 'https://placeholder.com/800x600',
    excerpt: 'Discover proven strategies for writing content that turns readers into customers.'
  },
  {
    title: 'The Art of Technical Writing',
    slug: 'art-of-technical-writing',
    category: 'Technical Writing',
    date: 'May 22, 2025',
    image: 'https://placeholder.com/800x600',
    excerpt: 'Master the skills needed to explain complex topics in simple terms.'
  }
]

// Newsletter subscription
const email = ref('')
const subscriptionMessage = ref('')
const subscriptionSuccess = ref(false)

const subscribe = () => {
  // Simulate API call
  subscriptionSuccess.value = true
  subscriptionMessage.value = 'Thank you for subscribing! Please check your email to confirm.'
  email.value = ''
}

// Share functionality
const sharePost = (post: any) => {
  if (navigator.share) {
    navigator.share({
      title: post.title,
      text: post.excerpt,
      url: window.location.origin + '/blog/' + post.slug
    })
  }
}
</script>`
