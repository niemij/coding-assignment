declare module '@types/post' {
  export interface Post {
    post_id: number;
    description: 'IMAGES' | 'TEXT' | 'VIDEOS' | 'STORY';
    status: 'VISIBLE' | 'HIDDEN' | 'DELETED';
    data: PostData;
    reaction_count: number;
    impacter_id: number;
    published_at: string;
    created_at: string;
    updated_at: string;
  }

  export interface PostData {
    media: Data[];
  }

  interface Data {
    image: string;
    width: number;
    height: number;
    version: string;
    description: string;
  }
}
