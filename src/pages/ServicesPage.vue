`<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <!-- Services Hero -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Services</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Professional content writing services tailored to your specific needs and goals.</p>
      </div>

      <!-- Service Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div v-for="service in services" :key="service.title" 
             class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <component :is="service.icon" class="w-12 h-12 text-blue-600 mb-4" />
          <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
          <p class="text-gray-600 mb-4">{{ service.description }}</p>
          <ul class="space-y-2">
            <li v-for="feature in service.features" :key="feature" class="flex items-start">
              <CheckIcon class="w-5 h-5 text-green-500 mr-2 mt-1" />
              <span>{{ feature }}</span>
            </li>
          </ul>
          <router-link :to="{ name: 'contact', query: { service: service.title }}" 
                     class="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Get Started
          </router-link>
        </div>
      </div>

      <!-- Process Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-12">My Writing Process</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="step in process" :key="step.title" class="text-center">
            <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <component :is="step.icon" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div>
        <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-6">
          <div v-for="faq in faqs" :key="faq.question" class="border rounded-lg">
            <button @click="faq.isOpen = !faq.isOpen" 
                    class="w-full px-6 py-4 text-left flex justify-between items-center">
              <span class="font-semibold">{{ faq.question }}</span>
              <ChevronDownIcon :class="['w-5 h-5 transition-transform', faq.isOpen ? 'rotate-180' : '']" />
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {   DocumentTextIcon, PencilIcon, ChartBarIcon,
  LightBulbIcon, DocumentMagnifyingGlassIcon,
  CheckCircleIcon, CheckIcon, ChevronDownIcon 
} from '@heroicons/vue/24/outline'

const services = [
  {
    title: 'Blog Writing',
    icon: DocumentTextIcon,
    description: 'Engaging blog posts that attract and retain readers while boosting your SEO.',
    features: [
      'Keyword research and optimization',
      'Original, well-researched content',
      'Engaging headlines and meta descriptions',
      'Internal and external linking'
    ]
  },
  {
    title: 'Website Copy',
    icon: PencilIcon,
    description: 'Compelling website content that converts visitors into customers.',
    features: [
      'Clear value proposition',
      'Persuasive call-to-actions',
      'SEO-friendly content',
      'Brand voice consistency'
    ]
  },
  {
    title: 'Content Strategy',
    icon: ChartBarIcon,
    description: 'Strategic content planning aligned with your business goals.',
    features: [
      'Content audit and analysis',
      'Editorial calendar planning',
      'Keyword and topic research',
      'Performance tracking'
    ]
  }
]

const process = [
  {
    title: 'Discovery',
    icon: LightBulbIcon,
    description: 'Understanding your goals, audience, and requirements'
  },
  {
    title: 'Research',
    icon: DocumentMagnifyingGlassIcon,
    description: 'In-depth research and keyword analysis'
  },
  {
    title: 'Writing',
    icon: PencilIcon,
    description: 'Creating engaging, SEO-optimized content'
  },
  {
    title: 'Review',
    icon: CheckCircleIcon,
    description: 'Revisions and quality assurance'
  }
]

const faqs = ref([
  {
    question: 'What are your turnaround times?',
    answer: 'Turnaround times vary depending on the project scope. Blog posts typically take 3-5 business days, while website copy may take 5-7 business days.',
    isOpen: false
  },
  {
    question: 'Do you offer revisions?',
    answer: `Yes, all projects include up to two rounds of revisions to ensure you're completely satisfied with the final content.`,
    isOpen: false
  },
  {
    question: 'How do you handle industry-specific content?',
    answer: 'I conduct thorough research and can work with your subject matter experts to ensure accuracy and expertise in the content.',
    isOpen: false
  }
])

</script>
