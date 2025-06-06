`<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <!-- About Hero -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Professional content writer with over [X] years of experience crafting compelling content that drives results.</p>
      </div>

      <!-- Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div class="space-y-6">
          <h2 class="text-3xl font-bold text-gray-900">Hi, I'm [Writer's Name]</h2>
          <p class="text-gray-600">I specialize in creating engaging, SEO-optimized content that helps businesses connect with their audience and achieve their goals. With expertise in [specific niches], I bring a unique blend of creativity and strategic thinking to every project.</p>
          <p class="text-gray-600">My approach combines deep research, clear communication, and a focus on delivering measurable results for my clients.</p>
          <div class="flex gap-4">
            <a href="#" class="text-blue-600 hover:text-blue-800">LinkedIn</a>
            <a href="#" class="text-blue-600 hover:text-blue-800">Twitter</a>
          </div>
        </div>
        <div class="bg-gray-100 p-8 rounded-lg">
          <h3 class="text-2xl font-semibold mb-6">Areas of Expertise</h3>
          <ul class="space-y-4">
            <li v-for="skill in expertise" :key="skill.area" class="flex items-start">
              <div class="mt-1 mr-4 text-blue-600">
                <component :is="skill.icon" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-semibold">{{ skill.area }}</h4>
                <p class="text-gray-600">{{ skill.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Experience & Education -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
          <div class="space-y-8">
            <div v-for="exp in experience" :key="exp.title" class="border-l-4 border-blue-600 pl-4">
              <h4 class="font-semibold">{{ exp.title }}</h4>
              <p class="text-gray-600">{{ exp.company }}</p>
              <p class="text-sm text-gray-500">{{ exp.period }}</p>
              <p class="mt-2 text-gray-600">{{ exp.description }}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Education & Certifications</h3>
          <div class="space-y-8">
            <div v-for="edu in education" :key="edu.degree" class="border-l-4 border-blue-600 pl-4">
              <h4 class="font-semibold">{{ edu.degree }}</h4>
              <p class="text-gray-600">{{ edu.institution }}</p>
              <p class="text-sm text-gray-500">{{ edu.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, PencilSquareIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/vue/24/outline'

const expertise = [
  {
    area: 'SEO Content Writing',
    description: 'Creating content that ranks well and drives organic traffic',
    icon: ChartBarIcon
  },
  {
    area: 'Technical Writing',
    description: 'Breaking down complex topics into clear, digestible content',
    icon: PencilSquareIcon
  },
  {
    area: 'Content Strategy',
    description: 'Developing comprehensive content plans aligned with business goals',
    icon: LightBulbIcon
  },
  {
    area: 'Brand Storytelling',
    description: 'Crafting compelling narratives that resonate with target audiences',
    icon: CheckCircleIcon
  }
]

const experience = [
  {
    title: 'Senior Content Writer',
    company: '[Company Name]',
    period: '2020 - Present',
    description: 'Lead content creation for major clients across various industries, resulting in 40% increase in organic traffic.'
  },
  {
    title: 'Content Strategist',
    company: '[Agency Name]',
    period: '2018 - 2020',
    description: 'Developed and executed content strategies for B2B and B2C clients.'
  }
]

const education = [
  {
    degree: 'Bachelor of Arts in Communications',
    institution: '[University Name]',
    year: '2018'
  },
  {
    degree: 'Content Marketing Certification',
    institution: 'HubSpot Academy',
    year: '2019'
  }
]
</script>`
