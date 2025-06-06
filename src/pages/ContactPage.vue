`<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p class="text-gray-600 mb-8">Have a project in mind? Let's discuss how I can help you achieve your content goals.</p>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input v-model="form.name" 
                     type="text" 
                     id="name"
                     required
                     class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="form.email" 
                     type="email" 
                     id="email"
                     required
                     class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <label for="service" class="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
              <select v-model="form.service"
                      id="service"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a service</option>
                <option v-for="service in services" 
                        :key="service" 
                        :value="service">
                  {{ service }}
                </option>
              </select>
            </div>

            <div>
              <label for="budget" class="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
              <select v-model="form.budget"
                      id="budget"
                      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select budget range</option>
                <option v-for="range in budgetRanges" 
                        :key="range" 
                        :value="range">
                  {{ range }}
                </option>
              </select>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea v-model="form.message"
                        id="message"
                        rows="4"
                        required
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>

            <button type="submit" 
                    :disabled="submitting"
                    class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>

          <div v-if="formMessage" 
               :class="['mt-4 p-4 rounded-lg', 
                       formSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
            {{ formMessage }}
          </div>
        </div>

        <!-- Contact Information -->
        <div class="lg:pl-8">
          <div class="bg-gray-50 p-8 rounded-lg">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <EnvelopeIcon class="w-6 h-6 text-blue-600 mt-1" />
                <div class="ml-4">
                  <h3 class="font-semibold">Email</h3>
                  <p class="text-gray-600">contact@example.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <PhoneIcon class="w-6 h-6 text-blue-600 mt-1" />
                <div class="ml-4">
                  <h3 class="font-semibold">Phone</h3>
                  <p class="text-gray-600">[Your Phone Number]</p>
                </div>
              </div>

              <div class="flex items-start">
                <ClockIcon class="w-6 h-6 text-blue-600 mt-1" />
                <div class="ml-4">
                  <h3 class="font-semibold">Office Hours</h3>
                  <p class="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="font-semibold mb-4">Connect on Social Media</h3>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-600 hover:text-blue-600">
                  <LinkedinIcon class="w-6 h-6" />
                </a>
                <a href="#" class="text-gray-600 hover:text-blue-600">
                  <TwitterIcon class="w-6 h-6" />
                </a>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="font-semibold mb-4">FAQ</h3>
              <div class="space-y-4">
                <details v-for="faq in faqs" :key="faq.question" class="group">
                  <summary class="flex justify-between items-center cursor-pointer">
                    <span>{{ faq.question }}</span>
                    <ChevronDownIcon class="w-5 h-5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p class="mt-2 text-gray-600">{{ faq.answer }}</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

// Mock social media icons
const LinkedinIcon = EnvelopeIcon // Replace with actual LinkedIn icon
const TwitterIcon = PhoneIcon // Replace with actual Twitter icon

const route = useRoute()

const services = [
  'Blog Writing',
  'Website Copy',
  'Content Strategy',
  'Technical Writing',
  'Email Marketing',
  'Social Media Content'
]

const budgetRanges = [
  'Less than $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500+'
]

const faqs = [
  {
    question: 'What is your typical turnaround time?',
    answer: 'Turnaround times vary by project. Blog posts typically take 3-5 business days, while larger projects may take 1-2 weeks.'
  },
  {
    question: 'Do you offer rush services?',
    answer: 'Yes, rush services are available for an additional fee, subject to availability.'
  }
]

const form = ref({
  name: '',
  email: '',
  service: '',
  budget: '',
  message: ''
})

const submitting = ref(false)
const formMessage = ref('')
const formSuccess = ref(false)

onMounted(() => {
  // Pre-fill service if provided in URL query
  const serviceQuery = route.query.service
  if (serviceQuery && services.includes(serviceQuery as string)) {
    form.value.service = serviceQuery as string
  }
})

const submitForm = async () => {
  submitting.value = true
  formMessage.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    formSuccess.value = true
    formMessage.value = 'Thank you for your message! I\'ll get back to you within 24 hours.'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      service: '',
      budget: '',
      message: ''
    }
  } catch (error) {
    formSuccess.value = false
    formMessage.value = 'Sorry, there was an error sending your message. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>`
