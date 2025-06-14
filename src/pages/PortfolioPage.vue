<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <!-- Portfolio Hero -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">A selection of my best work across various industries and content types.</p>
      </div>

      <!-- Filter Categories -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button v-for="category in categories" 
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-full',
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]">
          {{ category }}
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in filteredPortfolio" 
             :key="item.title"
             class="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover">
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <span class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {{ item.category }}
              </span>
              <span class="text-gray-500 text-sm">{{ item.date }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 mb-4">{{ item.description }}</p>
            <div class="flex items-center space-x-4">
              <a v-if="item.link" 
                 :href="item.link" 
                 target="_blank"
                 class="text-blue-600 hover:text-blue-800 flex items-center">
                <ArrowTopRightOnSquareIcon class="w-4 h-4 mr-1" />
                View Project
              </a>
              <button v-if="item.caseStudy"
                      @click="selectedProject = item"
                      class="text-blue-600 hover:text-blue-800 flex items-center">
                <DocumentTextIcon class="w-4 h-4 mr-1" />
                Case Study
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Case Study Modal -->
      <div v-if="selectedProject" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
           @click="selectedProject = null">
        <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
             @click.stop>
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold">{{ selectedProject.title }}</h3>
              <button @click="selectedProject = null">
                <XMarkIcon class="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <div class="prose max-w-none">
              <h4 class="font-semibold mb-2">Challenge</h4>
              <p class="mb-4">{{ selectedProject.caseStudy?.challenge }}</p>
              
              <h4 class="font-semibold mb-2">Solution</h4>
              <p class="mb-4">{{ selectedProject.caseStudy?.solution }}</p>
              
              <h4 class="font-semibold mb-2">Results</h4>
              <ul class="list-disc pl-5 mb-4">
                <li v-for="result in selectedProject.caseStudy?.results" 
                    :key="result"
                    class="mb-2">
                  {{ result }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  ArrowTopRightOnSquareIcon, 
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

interface CaseStudy {
  challenge: string;
  solution: string;
  results: string[];
}

interface PortfolioItem {
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  link: string;
  caseStudy?: CaseStudy;
}

const selectedProject = ref<PortfolioItem | null>(null);
const selectedCategory = ref('All');

const categories = ['All', 'Blog Posts', 'Technical Writing', 'Marketing Copy', 'SEO Content'];

const portfolio: PortfolioItem[] = [
  {
    title: 'Tech Company Website Redesign',
    category: 'Website Copy',
    date: 'March 2025',
    description: 'Complete website copy overhaul for a leading tech company, focusing on product descriptions and value proposition.',
    image: 'https://placeholder.com/800x600',
    link: '#',
    caseStudy: {
      challenge: 'The client needed to communicate complex technical products in a way that resonated with both technical and non-technical audiences.',
      solution: 'Developed a multi-layer content strategy with different detail levels for various audience segments.',
      results: [
        '35% increase in time spent on product pages',
        '25% improvement in conversion rate',
        'Positive feedback from both technical and business stakeholders'
      ]
    }
  },
  {
    title: 'Healthcare Blog Series',
    category: 'Blog Posts',
    date: 'February 2025',
    description: 'A series of in-depth blog posts about healthcare technology and patient care.',
    image: 'https://placeholder.com/800x600',
    link: '#'
  },
  {
    title: 'E-commerce Product Descriptions',
    category: 'Website Copy',
    date: 'January 2025',
    description: 'Created compelling product descriptions for an e-commerce fashion brand.',
    image: 'https://placeholder.com/800x600',
    link: '#'
  }
]

const filteredPortfolio = computed(() => {
  if (selectedCategory.value === 'All') return portfolio
  return portfolio.filter(item => item.category === selectedCategory.value)
})
</script>
