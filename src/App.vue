<template>
  <a-layout class="h-screen w-screen overflow-x-hidden flex">
    <a-layout-header>
      <a-page-header :show-back="false" :title="title" :subtitle="description">
        <template #extra>
          <a-popconfirm content="确定要重置对话吗？" @ok="() => onReset()">
            <a-button type="outline" :disabled="disabled">
              <template #icon><icon-refresh /> </template>
              重置对话
            </a-button>
          </a-popconfirm>
        </template>
      </a-page-header>
    </a-layout-header>

    <a-layout-content class="flex-1 overflow-y-scroll">
      <a-list :bordered="false" :split="false">
        <a-list-item v-for="item in messages" :key="item.content">
          <a-list-item-meta v-if="item.role === 'user'" :title="username">
            <template #avatar>
              <a-avatar :style="{ backgroundColor: '#3370ff' }">
                <icon-user />
              </a-avatar>
            </template>
            <template #description>
              <v-md-preview :text="item.content" />
            </template>
          </a-list-item-meta>
          <a-list-item-meta v-else :title="assistant">
            <template #avatar>
              <a-avatar :style="{ backgroundColor: '#00d0b6' }">
                <icon-robot />
              </a-avatar>
            </template>
            <template #description>
              <icon-loading v-if="item.content === ''" />
              <v-md-preview v-else :text="item.content" />
            </template>
          </a-list-item-meta>
        </a-list-item>
        <template #empty>
          <a-empty
            description="在下面输入内容，然后开始对话吧"
            class="flex-col p-16"
          />
        </template>
      </a-list>
    </a-layout-content>

    <a-layout-footer>
      <a-row :gutter="4" class="pl-6 pr-5 pb-2">
        <a-col :span="22">
          <a-textarea
            allow-clear
            v-model="text"
            :auto-size="{ minRows: 1, maxRows: 10 }"
            :disabled="disabled"
          />
        </a-col>
        <a-col :span="2">
          <a-button
            long
            type="primary"
            :disabled="disabled"
            @click="() => onSendMessage(text)"
          >
            <template #icon><icon-send /></template>
            <span class="max-sm:hidden">发送</span>
          </a-button>
        </a-col>
      </a-row>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createChat, createOAuth } from './api/service'
import { computed } from 'vue'

const title = import.meta.env.VITE_APP_TITLE
const description = import.meta.env.VITE_APP_DESCRIPTION
const username = import.meta.env.VITE_APP_USER_NAME
const assistant = import.meta.env.VITE_APP_ASSISTANT_NAME
const { client_id, client_secret } = JSON.parse(import.meta.env.VITE_APP_KEY)

const access_token = ref<string>('')
const text = ref<string>('')
const messages = ref<Message[]>([])

const disabled = computed(() => {
  if (messages.value.length > 0) {
    return messages.value[messages.value.length - 1].content === ''
  } else {
    return false
  }
})

const fetchAccessToken = async () => {
  const authRes = await createOAuth({
    grant_type: 'client_credentials',
    client_id,
    client_secret
  })
  access_token.value = authRes.access_token
}

const onReset = () => {
  text.value = ''
  messages.value = []
}

const onSendMessage = async (content: string) => {
  if (content === '') return
  messages.value.push({ role: 'user', content })
  messages.value.push({ role: 'assistant', content: '' })

  text.value = ''

  const { result } = await createChat({
    access_token: access_token.value,
    messages: messages.value.slice(0, messages.value.length - 1)
  })

  messages.value[messages.value.length - 1].content = result
}

fetchAccessToken()
</script>
