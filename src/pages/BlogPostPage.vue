<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Comment } from '../types/blog';
import { useRoute } from 'vue-router';

interface BlogPost {
  title: string;
  image: string;
  content: any[];
  publishedAt: string;
  author?: string;
  likes?: number;
}

const route = useRoute();
const id = route.params.id as string;
const loading = ref(true);
const error = ref<string | null>(null);

const blogPost = ref<BlogPost>({
  title: '',
  image: '',
  content: [],
  publishedAt: '',
  author: 'Sarah Mitchell',
  likes: 0
});

const comments = ref<Comment[]>([
  {
    id: '1',
    content: 'Great article! Very informative.',
    author: 'Alice Smith',
    date: new Date().toLocaleDateString(),
    likes: 5,
    replies: [
      {
        id: '2',
        content: 'Totally agree with you!',
        author: 'Bob Johnson',
        date: new Date().toLocaleDateString(),
        likes: 2,
        replies: []
      }
    ]
  }
]);

const newComment = ref('');
const activeReplyBoxes = ref<Set<string>>(new Set());

const toggleReplyBox = (commentId: string) => {
  if (activeReplyBoxes.value.has(commentId)) {
    activeReplyBoxes.value.delete(commentId);
    newComment.value = ''; // Clear comment when canceling
  } else {
    activeReplyBoxes.value.add(commentId);
  }
};

const addComment = (parentId: string | null = null) => {
  const newCommentObj: Comment = {
    id: Date.now().toString(),
    content: newComment.value,
    author: 'Current User', // Replace with actual user data
    date: new Date().toLocaleDateString(),
    likes: 0,
    replies: []
  };

  if (parentId) {
    // Add reply to existing comment
    const findAndAddReply = (comments: Comment[]): boolean => {
      for (const comment of comments) {
        if (comment.id === parentId) {
          comment.replies.push(newCommentObj);
          return true;
        }
        if (comment.replies.length && findAndAddReply(comment.replies)) {
          return true;
        }
      }
      return false;
    };
    findAndAddReply(comments.value);
    toggleReplyBox(parentId); // Close reply box after submitting
  } else {
    // Add new top-level comment
    comments.value.push(newCommentObj);
  }
  newComment.value = '';
};

const likeComment = (commentId: string) => {
  const findAndLikeComment = (comments: Comment[]): boolean => {
    for (const comment of comments) {
      if (comment.id === commentId) {
        comment.likes++;
        return true;
      }
      if (comment.replies.length && findAndLikeComment(comment.replies)) {
        return true;
      }
    }
    return false;
  };
  findAndLikeComment(comments.value);
};

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_STRAPI_API_HOST}/contents?filters[id][$eq]=${id}&populate=*`);
    const { data } = await response.json();


    const { Title, thumbnail, content, publishedAt } = data[0] || {};
    blogPost.value = {
      title: Title,
      image: getImageUrl(thumbnail),
      content,
      publishedAt,
    };
    loading.value = false;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred';
    loading.value = false;
  }
});

const getImageUrl = (imageData: any): string => {
 
  const { url } = imageData?.formats?.large || '';
  return `${import.meta.env.VITE_STRAPI_BASE_URL}${url}`;
};
</script>

<template>  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Main Content -->    <main class="flex-1 p-6">
      <!-- Blog Header Section -->
      <header class="mx-auto mb-7">
        <div class=" from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair leading-tight">{{ blogPost.title }}</h1>
          <div class="flex items-center gap-4">
            <img 
              src="/profile-pic.png" 
              alt="{{ blogPost.author }}"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div class="font-semibold text-gray-900">Sarah Mitchell</div>
              <div class="text-gray-600 text-sm">{{ blogPost.publishedAt }}</div>
            </div>
          </div>
           <img 
          :src="blogPost.image" 
          :alt="blogPost.title"
          class="w-full h-[400px] object-cover rounded-lg mt-6"
        />
        </div>
       
      </header>

      <!-- Blog Content -->
      <article class="rounded-lg p-8 mx-auto">
        <div class="prose prose-lg text-black overflow-y-auto" style="scrollbar-width: none; -ms-overflow-style: none; h-15">
          <!-- {{ blogPost.content }} -->
            <div v-for="(block, index) in blogPost.content" :key="index" class="mb-6">
    <div v-html="block.children[0].text"></div>
  </div>
     
        </div>
      </article>
        <section class="flex-shrink-0  border-t">
      <div class="max-w-3xl mx-auto p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        
        <!-- Add Comment Form -->
        <div class="mb-6">
          <textarea
            v-model="newComment"
            class="w-full p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Add a comment..."
          ></textarea>
          <button
            @click="addComment()"
            class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>

        <!-- Comments List -->
        <div class="space-y-6">
          <template v-for="comment in comments" :key="comment.id">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="text-gray-900">
                  <strong>{{ comment.author }}</strong>
                  <span class="text-gray-600 text-sm ml-2">{{ comment.date }}</span>
                </div>
                <button 
                  @click="likeComment(comment.id)"
                  class="text-gray-700 hover:text-blue-600"
                >                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    {{ comment.likes }}
                  </span>
                </button>
              </div>              <p class="mt-2 text-gray-900">{{ comment.content }}</p>
              
              <!-- Reply Actions -->
              <div class="mt-4 flex gap-2">
                <button
                  v-if="!activeReplyBoxes.has(comment.id)"
                  @click="toggleReplyBox(comment.id)"
                  class="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Reply
                </button>
                <button
                  v-if="activeReplyBoxes.has(comment.id)"
                  @click="toggleReplyBox(comment.id)"
                  class="text-gray-600 hover:text-gray-700 text-sm font-semibold flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>

              <!-- Nested Replies -->
              <div class="mt-4 ml-6 space-y-4">
                <div v-for="reply in comment.replies" :key="reply.id" class="bg-white rounded-lg p-4 shadow-sm">
                  <div class="flex justify-between items-start">
                    <div class="text-gray-900">
                      <strong>{{ reply.author }}</strong>
                      <span class="text-gray-600 text-sm ml-2">{{ reply.date }}</span>
                    </div>
                    <button 
                      @click="likeComment(reply.id)"
                      class="text-gray-700 hover:text-blue-600"
                    >
                      <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {{ reply.likes }}
                      </span>
                    </button>
                  </div>
                  <p class="mt-2 text-gray-900">{{ reply.content }}</p>
                </div>
              </div>

              <!-- Reply Form (Conditional) -->
              <div v-if="activeReplyBoxes.has(comment.id)" class="mt-4 ml-6">
                <textarea
                  v-model="newComment"
                  class="w-full p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  placeholder="Write your reply..."
                ></textarea>
                <div class="mt-2 flex gap-2">
                  <button
                    @click="addComment(comment.id)"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Post Reply
                  </button>
                  <button
                    @click="toggleReplyBox(comment.id)"
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    </main>

    <!-- Fixed Comments Section -->

  </div>
</template>

<style scoped>
.prose {
  max-width: none;
}

.prose::-webkit-scrollbar {
  display: none;
}
</style>