<script setup lang="ts">
import { ref } from 'vue';
import type { Comment, Post } from '../types/blog';

// Mock data - replace with actual API calls in production
const blogPost = ref<Post>({
  id: '1',
  title: 'Understanding Modern Web Development',
  content: `Web development has evolved significantly over the past decade, and staying current with modern practices is crucial for creating efficient, maintainable, and user-friendly applications. In this comprehensive guide, we'll explore the key concepts and tools that define modern web development.

## The Foundation: HTML5, CSS3, and JavaScript
Modern web development starts with a solid understanding of the fundamentals. HTML5 provides semantic structure, CSS3 handles styling and animations, and JavaScript brings interactivity and dynamic functionality to web applications.

### Component-Based Architecture
One of the most significant shifts in modern web development is the adoption of component-based architecture. Frameworks like Vue.js, React, and Angular have popularized this approach, where applications are built using reusable, self-contained components. This methodology offers several benefits:

- **Maintainability**: Components are easier to maintain and update
- **Reusability**: Code can be reused across different parts of the application
- **Scalability**: Applications can grow without becoming unwieldy

## Modern Development Tools and Practices

### 1. Build Tools and Module Bundlers
Tools like Vite, Webpack, and Rollup help optimize our code for production. They handle:
- Code splitting and lazy loading
- Asset optimization
- Development server capabilities
- Hot module replacement

### 2. CSS Technologies
Modern CSS has evolved with powerful features and methodologies:
- Flexbox and Grid for layout
- CSS Modules and CSS-in-JS
- Utility-first frameworks like Tailwind CSS
- CSS Custom Properties (variables)

### 3. TypeScript and Type Safety
TypeScript has become increasingly popular in modern web development, offering:
- Static type checking
- Better IDE support
- Enhanced code maintainability
- Improved team collaboration

## Best Practices for Modern Web Development

1. **Performance First**
   - Optimize images and assets
   - Implement code splitting
   - Use lazy loading for components and routes

2. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts
   - Adaptive images and content

3. **Security**
   - HTTPS everywhere
   - XSS prevention
   - CSRF protection
   - Input validation

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation
   - Screen reader compatibility

## Advanced Topics in Modern Web Development

### State Management
Modern web applications often require sophisticated state management solutions. Popular options include:

1. **Vuex/Pinia (Vue.js)**
   - Centralized state management
   - Predictable state mutations
   - Developer tools integration
   - Time-travel debugging

2. **Redux/MobX (React)**
   - Unidirectional data flow
   - Immutable state updates
   - Middleware support
   - Rich ecosystem

3. **NgRx (Angular)**
   - RxJS integration
   - Effect handlers
   - Store devtools
   - Meta-reducers

### API Integration
Modern web applications commonly interact with various APIs:

1. **REST APIs**
   - HTTP methods
   - Resource-based URLs
   - Stateless communication
   - Cache mechanisms

2. **GraphQL**
   - Query flexibility
   - Type system
   - Real-time updates
   - Reduced over-fetching

3. **WebSockets**
   - Bi-directional communication
   - Real-time data
   - Event-driven architecture
   - Low latency

### Testing Strategies
Comprehensive testing is crucial for modern web applications:

1. **Unit Testing**
   - Jest
   - Vitest
   - Mocha
   - Component isolation

2. **Integration Testing**
   - Cypress
   - Playwright
   - TestCafe
   - End-to-end scenarios

3. **Performance Testing**
   - Lighthouse
   - WebPageTest
   - Core Web Vitals
   - User-centric metrics

## Emerging Trends

### 1. JAMstack Architecture
The JAMstack architecture continues to gain popularity:
- Static site generation
- Headless CMS integration
- API-first approach
- Edge computing

### 2. Web Assembly
WebAssembly is opening new possibilities:
- Near-native performance
- Language interoperability
- Complex computations
- Gaming applications

### 3. Progressive Web Apps
PWAs combine the best of web and mobile:
- Offline functionality
- Push notifications
- Home screen installation
- Native-like experience

### 4. AI and Machine Learning
Integration of AI/ML in web applications:
- Chatbots and virtual assistants
- Recommendation systems
- Image recognition
- Natural language processing

## Future Considerations

### 1. Sustainability
Web development is increasingly considering environmental impact:
- Green hosting
- Efficient code
- Optimized assets
- Reduced carbon footprint

### 2. Privacy and Data Protection
Growing emphasis on user privacy:
- GDPR compliance
- Cookie consent
- Data minimization
- Privacy by design

### 3. Cross-Platform Development
The line between platforms continues to blur:
- Desktop applications
- Mobile apps
- IoT devices
- Smart TV applications

## Best Practices for Success

1. **Continuous Learning**
   - Follow industry blogs
   - Attend conferences
   - Participate in communities
   - Build side projects

2. **Code Quality**
   - Write clean code
   - Document thoroughly
   - Review regularly
   - Refactor when needed

3. **Collaboration**
   - Use version control
   - Write clear commit messages
   - Participate in code reviews
   - Share knowledge

4. **User Experience**
   - Design for users
   - Gather feedback
   - Iterate regularly
   - Monitor analytics

## Conclusion
Modern web development is an exciting field that continues to evolve. By staying updated with these practices and tools, developers can create better, more maintainable applications that provide excellent user experiences.

Remember that while tools and frameworks come and go, understanding the core principles of web development will always be valuable. Focus on learning the fundamentals deeply, and you'll be better equipped to adapt to whatever new technologies emerge in the future.`,
  author: 'Sarah Mitchell',
  date: new Date().toLocaleDateString(),
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
const isLiked = ref(false);
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

const toggleLike = () => {
  if (!blogPost.value.likes) {
    blogPost.value.likes = 0;
  }
  if (isLiked.value) {
    blogPost.value.likes = Math.max(0, (blogPost.value.likes || 0) - 1);
  } else {
    blogPost.value.likes = (blogPost.value.likes || 0) + 1;
  }
  isLiked.value = !isLiked.value;
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
              <div class="font-semibold text-gray-900">{{ blogPost.author }}</div>
              <div class="text-gray-600 text-sm">{{ blogPost.date }}</div>
            </div>
          </div>
           <img 
          src="https://placehold.co/1200x600/e2e8f0/1e40af?text=Featured+Blog+Image"
          alt="Blog feature image"
          class="w-full h-[400px] object-cover rounded-lg mt-6"
        />
        </div>
       
      </header>

      <!-- Blog Content -->
      <article class="rounded-lg p-8 mx-auto">
        <div class="prose prose-lg text-black overflow-y-auto" style="scrollbar-width: none; -ms-overflow-style: none; h-15">
          {{ blogPost.content }}
     
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
                >
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
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