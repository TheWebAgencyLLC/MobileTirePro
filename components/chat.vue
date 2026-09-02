<template>
  <div class="chat-widget">
    <!-- Chat Toggle Button -->
    <button
        v-if="!isOpen"
        @click="openChat"
        class="chat-toggle group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
      <span class="chat-tooltip">Chat with us!</span>
    </button>

    <!-- Chat Window -->
    <Transition name="chat-slide">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" :class="connected ? 'bg-green-400' : 'bg-gray-400'"></div>
            <h3 class="text-lg font-semibold">Chat Support</h3>
          </div>
          <button @click="closeChat" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Initial Form -->
        <div v-if="!chatStarted" class="chat-form">
          <div class="text-center mb-4">
            <img src="/images/icons/racing.webp" alt="Mobile Tire Pro" class="w-12 h-12 mx-auto mb-2">
            <h4 class="text-lg font-semibold">Welcome to Mobile Tire Pro!</h4>
            <p class="text-sm text-gray-600 mt-1">How can we help you today?</p>
          </div>

          <form @submit.prevent="startChat" class="space-y-3">
            <div>
              <input
                  v-model="customerInfo.name"
                  placeholder="Your name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vivid-red focus:border-transparent"
                  required
              />
            </div>
            <div>
              <input
                  v-model="customerInfo.email"
                  placeholder="Your email (optional)"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vivid-red focus:border-transparent"
              />
            </div>
            <button
                type="submit"
                :disabled="loading || !customerInfo.name"
                class="w-full bg-vivid-red text-white py-2 px-4 rounded-lg hover:bg-crimson-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Connecting...' : 'Start Chat' }}
            </button>
          </form>
        </div>

        <!-- Chat Messages -->
        <div v-else class="chat-content">
          <div v-if="adminJoined" class="system-message">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Support agent has joined the chat
          </div>

          <div class="messages" ref="messagesContainer">
            <div
                v-for="message in messages"
                :key="message._id || message.id"
                :class="['message', message.senderType]"
            >
              <div class="message-bubble">
                <p class="message-text">{{ message.text }}</p>
                <span class="message-time">
                  {{ formatTime(message.createdAt) }}
                </span>
              </div>
            </div>

            <div v-if="isTyping" class="typing-indicator">
              <div class="typing-bubble">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <form @submit.prevent="sendMessage" class="message-input">
            <input
                v-model="newMessage"
                @input="handleTyping"
                placeholder="Type your message..."
                :disabled="!connected"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vivid-red focus:border-transparent"
            />
            <button
                type="submit"
                :disabled="!newMessage.trim() || !connected"
                class="bg-vivid-red text-white p-2 rounded-lg hover:bg-crimson-red transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Socket } from 'socket.io-client'

// Get auth info if available
const { data: authData } = await useFetch('/api/auth/test', { server: false })
const isAuthenticated = ref(!!authData.value?.token)
const userEmail = ref(authData.value?.email || '')

// Nuxt app instance for socket plugin
const { $socket } = useNuxtApp()

// State
const socket = ref<Socket | null>(null)
const isOpen = ref(false)
const chatStarted = ref(false)
const connected = ref(false)
const loading = ref(false)
const messages = ref<any[]>([])
const newMessage = ref('')
const unreadCount = ref(0)
const isTyping = ref(false)
const adminJoined = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const typingTimeout = ref<NodeJS.Timeout | null>(null)

// Generate or retrieve session ID
const sessionId = ref('')

const customerInfo = ref({
  name: '',
  email: userEmail.value || ''
})

// Initialize socket connection
const initSocket = () => {
  socket.value = $socket.connect()

  if (!socket.value) return

  socket.value.on('connect', () => {
    connected.value = true
    console.log('Connected to chat server')
  })

  socket.value.on('disconnect', () => {
    connected.value = false
  })

  socket.value.on('chat-history', (history: any[]) => {
    messages.value = history
    scrollToBottom()
  })

  socket.value.on('new-message', (message: any) => {
    messages.value.push(message)

    // Play notification sound if message is from admin
    if (message.senderType === 'admin' && !isOpen.value) {
      unreadCount.value++
      playNotificationSound()
    }

    scrollToBottom()
    saveMessagesToLocal()
  })

  socket.value.on('admin-joined', () => {
    adminJoined.value = true
  })

  socket.value.on('typing', (data: any) => {
    if (data.senderType === 'admin') {
      isTyping.value = true
    }
  })

  socket.value.on('stop-typing', (data: any) => {
    if (data.senderType === 'admin') {
      isTyping.value = false
    }
  })
}

// Generate unique session ID
const generateSessionId = () => {
  const stored = localStorage.getItem('mtp-chat-session-id')
  if (stored) {
    return stored
  }

  const newId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  localStorage.setItem('mtp-chat-session-id', newId)
  return newId
}

// Load saved chat info
const loadChatInfo = () => {
  const savedInfo = localStorage.getItem('mtp-chat-info')
  if (savedInfo) {
    const info = JSON.parse(savedInfo)
    customerInfo.value = info
    chatStarted.value = true
  }

  // Load messages
  const savedMessages = localStorage.getItem('mtp-chat-messages')
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages)
  }
}

// Save messages to localStorage
const saveMessagesToLocal = () => {
  localStorage.setItem('mtp-chat-messages', JSON.stringify(messages.value))
}

// Open chat
const openChat = () => {
  isOpen.value = true
  unreadCount.value = 0

  if (!sessionId.value) {
    sessionId.value = generateSessionId()
  }

  // If chat was already started, reconnect
  if (chatStarted.value && socket.value) {
    socket.value.connect()
    socket.value.emit('customer-init', {
      sessionId: sessionId.value,
      customerName: customerInfo.value.name,
      customerEmail: customerInfo.value.email,
      customerData: {
        isAuthenticated: isAuthenticated.value,
        userEmail: userEmail.value,
        page: window.location.pathname
      }
    })
  }
}

// Close chat
const closeChat = () => {
  isOpen.value = false
  if (socket.value?.connected) {
    socket.value.disconnect()
  }
}

// Start chat
const startChat = async () => {
  loading.value = true

  try {
    // Save customer info
    localStorage.setItem('mtp-chat-info', JSON.stringify(customerInfo.value))
    chatStarted.value = true

    // Connect socket
    if (socket.value) {
      socket.value.connect()
      socket.value.emit('customer-init', {
        sessionId: sessionId.value,
        customerName: customerInfo.value.name,
        customerEmail: customerInfo.value.email,
        customerData: {
          isAuthenticated: isAuthenticated.value,
          userEmail: userEmail.value,
          page: window.location.pathname
        }
      })
    }
  } finally {
    loading.value = false
  }
}

// Send message
const sendMessage = () => {
  if (!newMessage.value.trim() || !connected.value || !socket.value) return

  const message = {
    sessionId: sessionId.value,
    text: newMessage.value,
    senderType: 'customer',
    senderId: sessionId.value,
    senderName: customerInfo.value.name || 'Customer',
    createdAt: new Date().toISOString()
  }

  socket.value.emit('send-message', message)

  // Add message to local array immediately
  messages.value.push({
    ...message,
    id: `temp-${Date.now()}`
  })

  newMessage.value = ''
  stopTyping()
  scrollToBottom()
  saveMessagesToLocal()
}

// Typing indicators
const handleTyping = () => {
  if (!socket.value?.connected) return

  socket.value.emit('typing', {
    sessionId: sessionId.value,
    senderType: 'customer'
  })

  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value)
  }

  typingTimeout.value = setTimeout(stopTyping, 1000)
}

const stopTyping = () => {
  if (!socket.value?.connected) return

  socket.value.emit('stop-typing', {
    sessionId: sessionId.value,
    senderType: 'customer'
  })
}

// Utilities
const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const playNotificationSound = () => {
  // You can add a notification sound here
  // const audio = new Audio('/notification.mp3')
  // audio.play()
}

// Lifecycle
onMounted(() => {
  loadChatInfo()
  initSocket()
})

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
  if (typingTimeout.value) {
    clearTimeout(typingTimeout.value)
  }
})
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
}

.chat-toggle:hover {
  transform: scale(1.05);
  background: #dc2626;
}

.chat-tooltip {
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.chat-toggle:hover .chat-tooltip,
.group:hover .chat-tooltip {
  opacity: 1;
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc2626;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
}

.chat-window {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #ef4444;
  color: white;
}

.chat-header h3 {
  margin: 0;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.chat-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.chat-form input {
  font-size: 14px;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.system-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #f3f4f6;
  color: #059669;
  font-size: 14px;
  font-weight: 500;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message.customer {
  align-self: flex-end;
}

.message.admin {
  align-self: flex-start;
}

.message-bubble {
  position: relative;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message.customer .message-bubble {
  background: #ef4444;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.admin .message-bubble {
  background: #f3f4f6;
  color: #1f2937;
  border-bottom-left-radius: 4px;
}

.message-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}

.message.customer .message-time {
  text-align: right;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 0;
}

.typing-bubble {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: #f3f4f6;
  border-radius: 18px;
  border-bottom-left-radius: 4px;
}

.typing-bubble span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: typing 1.4s infinite;
}

.typing-bubble span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-bubble span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.message-input {
  display: flex;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
  background: #fafafa;
}

.message-input input {
  font-size: 14px;
}

/* Transitions */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

/* Mobile responsiveness */
@media (max-width: 500px) {
  .chat-window {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }

  .chat-toggle {
    bottom: 20px;
    right: 20px;
  }
}

/* Dark mode support */
.dark .chat-window {
  background: #1f2937;
  color: white;
}

.dark .chat-header {
  background: #dc2626;
}

.dark .system-message {
  background: #374151;
  color: #10b981;
}

.dark .message.admin .message-bubble {
  background: #374151;
  color: white;
}

.dark .message-input {
  background: #111827;
  border-top-color: #374151;
}

.dark .message-input input {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.dark .chat-form input {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.dark .typing-bubble {
  background: #374151;
}
</style>
