`<template>
  <div class="min-h-screen w-full bg-gray-50">
    <nav class="w-full bg-white shadow">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">            <router-link to="/" class="flex items-center">              <span class="text-3xl font-fancy font-normal text-gray-800 hover:text-blue-600 transition-colors">Sarah Mitchell</span>
            </router-link>
          </div>
          <!-- Desktop Navigation -->
          <div class="hidden sm:flex sm:space-x-8 items-center">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.path" 
              :to="item.path" 
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                route.path === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <TransitionRoot as="template" :show="mobileMenuOpen">
        <Dialog as="div" class="relative sm:hidden" @close="mobileMenuOpen = false">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="-translate-x-full"
            >
              <DialogPanel class="relative flex-1 flex flex-col w-full max-w-xs bg-white">
                <div class="px-4 pt-5 pb-4">
                  <div class="flex items-center justify-between">                  <div class="text-2xl font-fancy font-normal text-gray-800">Sarah Mitchell</div>
                    <button
                      type="button"
                      class="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      @click="mobileMenuOpen = false"
                    >
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" />
                    </button>
                  </div>
                  <div class="mt-6">
                    <nav class="grid gap-y-4">
                      <router-link
                        v-for="item in navigationItems"
                        :key="item.path"
                        :to="item.path"
                        :class="[
                          'px-3 py-2 rounded-md text-base font-medium transition-colors',
                          route.path === item.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                        ]"
                        @click="mobileMenuOpen = false"
                      >
                        {{ item.name }}
                      </router-link>
                    </nav>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </nav>

    <main>
      <router-view></router-view>
    </main>    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl flex flex-col mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row md:flex-row gap-8 w-screen  items-center">
          <!-- Footer Content -->
          <div class="flex flex-col gap-8">
            <div>
              <h3 class="text-2xl font-fancy font-normal mb-4">Contact Us</h3>
              <p class="text-gray-300">Professional content writer specializing in creating engaging and effective content for businesses.</p>
            </div>
            <!-- <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li><router-link to="/services" class="text-gray-300 hover:text-white transition-colors">Services</router-link></li>
                <li><router-link to="/portfolio" class="text-gray-300 hover:text-white transition-colors">Portfolio</router-link></li>
                <li><router-link to="/blog" class="text-gray-300 hover:text-white transition-colors">Blog</router-link></li>
                <li><router-link to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</router-link></li>
              </ul>
            </div> -->
            <div>
              <!-- <h3 class="text-lg font-semibold mb-4">Contact</h3> -->
              <ul class="space-y-2 text-gray-300">
                <li>Email: sarah.mitchel@test.com</li>
                <li>Phone: 1234567890</li>
                <li>Location: India</li>
              </ul>
            </div>
          </div>
        
           <div class="mt-8 pt-8 border-l border-gray-700 text-center text-gray-400"></div>
          <!-- Newsletter Signup -->
          <div class="lg:w-1/3">
            <div class="bg-gray-700/50 rounded-xl p-6">
              <h3 class="text-xl font-semibold mb-2">Subscribe to My Newsletter</h3>
              <p class="text-gray-300 mb-4">Get the latest content writing tips and industry insights delivered to your inbox.</p>
              <form class="flex flex-col sm:flex-row gap-3" @submit.prevent="subscribeNewsletter">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  class="flex-1 px-4 py-2 rounded-lg bg-gray-600 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                >
                <button 
                  type="submit"
                  class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} <span class="text-2xl font-fancy text-gray-300"></span> All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
]

const subscribeNewsletter = () => {
  // Here you would typically handle the newsletter subscription
  // For now, we'll just log it
  console.log('Newsletter subscription submitted')
}
</script>`
