import {Post} from './post'

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

export interface PostReviewDTO {
  posts: Post[]
  user_reviews: Review[]
}
