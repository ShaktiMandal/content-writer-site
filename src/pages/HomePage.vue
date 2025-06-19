<template>
  <div>    <!-- Hero Section -->
    <div class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Image Column -->
          <div class="flex justify-center md:justify-end order-2 md:order-1">
            <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl transition-transform duration-300 hover:scale-110">
              <img 
                src="/profile-pic.png" 
                alt="Sarah Mitchell" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Content Column -->
          <div class="text-center md:text-left order-1 md:order-2">
            <h1 class="text-4xl sm:text-5xl font-playfair font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transforming Ideas Into Engaging Content
            </h1>
            <p class="text-xl text-gray-600 mb-8 font-inter leading-relaxed">
              Hi, I'm <span class="font-fancy text-2xl text-gray-800">Sarah Mitchell</span>, a professional content writer with over 8 years of experience. I specialize in crafting compelling narratives that connect with your audience and drive meaningful engagement.
            </p>
            <!-- <div class="flex flex-wrap gap-4 justify-center md:justify-start">              <router-link 
                to="/contact" 
                class="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-fancy text-xl"
                style="color: white !important;"
              >
                Let's Work Together
              </router-link>
              <router-link 
                to="/portfolio" 
                class="bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-gray-200"
              >
                View Portfolio
              </router-link>
            </div> -->
          </div>
        </div>
      </div>
    </div><!-- Services Overview -->   
     <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-row md:flex-row  gap-8">          <!-- Editor's Pick Column -->
          <div class="flex-1 lg:flex-initial lg:w-[40%]">
            <div class="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-8 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] h-full">
              <h2 class="text-3xl font-playfair font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Editor's Pick </h2>              <img 
                src="https://placehold.co/600x400/e2e8f0/1e40af?text=Featured+Post" 
                alt="Featured post" 
                class="w-full h-48 object-cover rounded-lg mb-6"
              />
              <span class="text-sm text-gray-500 font-inter block mb-2">June 1, 2025</span>
              <h3 class="text-xl font-playfair font-bold mb-3 hover:text-blue-600 transition-colors">How to Create Engaging Content That Converts</h3>
              <p class="text-gray-600 font-inter leading-relaxed mb-6">Learn the proven strategies to create content that not only attracts readers but converts them into loyal customers.</p>
              <router-link 
                to="/blog/engaging-content-converts" 
                class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>          <!-- Recent Posts Column -->
          <div class="flex-1 lg:flex-initial lg:w-[35%]">
            <h2 class="text-3xl font-playfair text-black font-bold mb-6">Recent Posts 🗒️</h2>
            <div class="space-y-6 h-100 overflow-auto">              <div v-for="post in recentPosts" :key="post.id" 
                class="flex flex-row gap-4 w-100 items-start border-b border-gray-100 pb-6 last:border-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                <div>
                  <img 
                    :src="getImageUrl(post.thumbnail)" 
                    :alt="post.Title" 
                    class="w-100 h-24 object-cover rounded-lg flex-shrink-0"
                  >
                </div>
                
                <div>
                 
                  <h4 class="font-playfair font-bold text-lg text-wrap mb-2 hover:text-blue-600 transition-colors truncate">
                    <router-link :to="{path: `/blog/${post.id}`}">{{ post.Title }}</router-link>
                  </h4>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-8 gap-2">
              <button v-for="page in 3" :key="page"
                :class="[
                  'w-10 h-10 rounded-lg font-semibold transition-colors flex items-center justify-center',
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                ]"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>
          </div>          <!-- Trending Posts Column -->
          <div class="flex-1 lg:flex-initial lg:w-[25%]">
            <div class="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 h-full">
              <h2 class="text-3xl font-playfair text-green-100 font-bold mb-6">Trending 🔥</h2>
              <div class="space-y-6">
                <div v-for="(post, index) in trendingPosts" :key="post.id" 
                  class="flex gap-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <span class="text-4xl font-fancy text-gray-200 leading-none group-hover:text-blue-200 transition-colors">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div class="min-w-0">
                    <h4 class="font-playfair font-bold hover:text-blue-600 transition-colors truncate">
                      <router-link :to="'/blog/' + post.id">{{  post.Title }}</router-link>
                    </h4>
                    <span class="text-sm text-gray-500">{{ post.views || 0 }} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    <!-- Testimonials -->
    <div class="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-playfair font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Let's hear from them</h2>
        
        <div class="relative">
          <div class="relative h-[300px] overflow-hidden">            <TransitionGroup
              name="slide"
              tag="div"
              class="relative w-full h-full"
              :data-direction="direction"
            >
              <div
                v-for="(testimonial, index) in testimonials"
                :key="testimonial.name"
                v-show="currentTestimonial === index"
                class="absolute inset-0 w-full transition-all duration-500"
              >
                <div class="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
                  <p class="text-gray-700 font-playfair text-lg italic mb-6">"{{ testimonial.text }}"</p>
                  <div class="font-inter">
                    <div class="font-semibold text-lg">{{ testimonial.name }}</div>
                    <div class="text-blue-600">{{ testimonial.position }}</div>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Navigation Arrows -->
          <button 
            @click="prevTestimonial(); resetAutoAdvance();" 
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            @click="nextTestimonial(); resetAutoAdvance();" 
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Navigation Dots -->
          <div class="flex justify-center space-x-2 mt-8">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="goToTestimonial(index)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentTestimonial === index ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { StrapiContent } from '../types/strapi';

const currentPage = ref(1);
const direction = ref('next');
const recentPosts = ref<StrapiContent[]>([]);
const trendingPosts = ref<StrapiContent[]>([]);

// Testimonials data and functions
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Marketing Director",
    text: "Working with this content writing service has transformed our brand voice. The quality and consistency of their work is outstanding, and they never miss a deadline."
  },
  {
    name: "Michael Chen",
    position: "CEO, TechStart",
    text: "Their ability to adapt to our technical industry while maintaining engaging, clear content has been invaluable. They've become an essential part of our content strategy."
  },
  {
    name: "Emily Rodriguez",
    position: "Content Manager",
    text: "The attention to detail and research that goes into each piece is remarkable. They've helped us increase our blog engagement by 200% in just six months."
  }
];

const currentTestimonial = ref(0);

const nextTestimonial = () => {
  direction.value = 'next';
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length;
};

const prevTestimonial = () => {
  direction.value = 'prev';
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length;
};

const goToTestimonial = (index: number) => {
  direction.value = index > currentTestimonial.value ? 'next' : 'prev';
  currentTestimonial.value = index;
  resetAutoAdvance();
};

// Auto-advance timer
let autoAdvanceTimer: number;

const startAutoAdvance = () => {
  autoAdvanceTimer = setInterval(nextTestimonial, 5000);
};

const resetAutoAdvance = () => {
  clearInterval(autoAdvanceTimer);
  startAutoAdvance();
}

const getImageUrl = (imageData: any): string => {
  console.log('[Debug] getImageUrl input:', imageData);

  if (!imageData) {
    console.log('[Debug] No image data provided');
    return '';
  }

  try {
    const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
    console.log('[Debug] Using base URL:', baseUrl);

    // Check for Strapi v4 structure first
    const strapiV4Url = imageData.data?.attributes?.url;
    if (strapiV4Url) {
      console.log('[Debug] Found Strapi v4 URL:', strapiV4Url);
      const fullUrl = `${baseUrl}${strapiV4Url}`;
      console.log('[Debug] Generated full URL:', fullUrl);
      return fullUrl;
    }

    // Fallback to checking other possible structures
    const imagePath = imageData.url || imageData.formats?.large?.url || '';
    console.log('[Debug] Image path from other formats:', imagePath);

    if (!imagePath) {
      console.log('[Debug] No valid image path found in:', imageData);
      return '';
    }

    const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
    const cleanImagePath = imagePath.replace(/^\/+/, '');
    const imageUrl = `${cleanBaseUrl}/${cleanImagePath}`;
    console.log('[Debug] Final image URL:', imageUrl);

    return imageUrl;
  } catch (error) {
    console.error('[Error] Error generating image URL:', error);
    return '';
  }
};

const setRecentPosts = (posts: StrapiContent[]): void => {
  recentPosts.value = posts.map(post => ({
    id: post.id,
    Title: post.Title || 'No Title Available',
    content: post.content || [],
    thumbnail: post.thumbnail,
    publishedAt: post.publishedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    image: post.image,
    likes: post.likes,
    views: post.views
  }));
};

const loadRecentPosts = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_STRAPI_API_HOST}/contents?populate=*`;
    console.log('[Debug] API URL:', apiUrl);
    console.log('[Debug] Base URL:', import.meta.env.VITE_STRAPI_BASE_URL);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Error] API Error:', errorText);
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('[Debug] First post data:', data.data?.[0]);
    
    if (data.data?.[0]?.attributes?.thumbnail) {
      console.log('[Debug] Thumbnail structure:', {
        raw: data.data[0].attributes.thumbnail,
        url: data.data[0].attributes.thumbnail.data?.attributes?.url,
        formats: data.data[0].attributes.thumbnail.data?.attributes?.formats
      });
    }
    
    setRecentPosts(data.data || []);
   } catch (error) {
    console.error('Failed to load recent posts:', error);
  }
};

  // Add this new method before the existing code
  const loadTrendingPosts = () => {
    trendingPosts.value = [
      {
        id: 1,
        Title: "10 Essential SEO Strategies for 2024",
        content: [],
        thumbnail: { url: '', formats: { large: { url: '' } } },
        publishedAt: "2024-01-15",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
        views: 1500,
        likes: 245,
        image: '',
      },
      {
        id: 2,
        Title: "The Art of Storytelling in Content Marketing",
        content: [],
        publishedAt: "2024-01-10",
        createdAt: "2024-01-10",
        updatedAt: "2024-01-10",
        views: 1200,
        likes: 189,
          thumbnail: { url: '', formats: { large: { url: '' } } },
        image: '',
      },
      {
        id: 3,
        Title: "How AI is Transforming Content Creation",
        content: [],
        publishedAt: "2024-01-05",
        createdAt: "2024-01-05",
        updatedAt: "2024-01-05",
        views: 980,
        likes: 156,
        image: '',
          thumbnail: { url: '', formats: { large: { url: '' } } },
      }
    ];
  };

onMounted(() => {
  // Debug log for environment variables
  console.log('API Host:', import.meta.env.VITE_STRAPI_API_HOST);
  console.log('API Token exists:', !!import.meta.env.VITE_STRAPI_API_TOKEN);
  
  loadRecentPosts();
  loadTrendingPosts();
  startAutoAdvance();
});

onUnmounted(() => {
  clearInterval(autoAdvanceTimer);
});
</script>

<style scoped>
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
}

.slide-enter-from[data-direction="next"] {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-from[data-direction="prev"] {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-to[data-direction="next"] {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-to[data-direction="prev"] {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
