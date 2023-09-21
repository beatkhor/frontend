export interface Review {
  id?: number
  created_at?: number
  updated_at?: number
  post_id?: number
  user_id?: number
  vote?: number
  content?: string
  parent?: number
  vote_count?: number
}
