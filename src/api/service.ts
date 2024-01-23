import axios from 'axios'

interface OAuthReq {
  grant_type: 'client_credentials'
  client_id: string
  client_secret: string
}

interface OAuthRes {
  access_token: string
}

export async function createOAuth(params: OAuthReq): Promise<OAuthRes> {
  const { data } = await axios.post<OAuthRes>(
    '/api/oauth/2.0/token',
    {},
    { params }
  )
  return data
}

interface ChatReq {
  access_token: string
  messages: Message[]
}

interface ChatRes {
  result: string
  flag: number
}

export async function createChat(params: ChatReq): Promise<ChatRes> {
  const { messages, access_token } = params
  const { data } = await axios.post<ChatRes>(
    '/api/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
    { messages },
    { params: { access_token } }
  )
  return data
}
