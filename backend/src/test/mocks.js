export const mockPost = {
	post_id: 1,
	description: 'test description',
	type: 'IMAGES',
	status: 'VISIBLE',
	data: {"media": [{"image": "https://picsum.photos/id/1/5616/3744", "width": 5616, "height": 3744, "version": "2019-03-14", "description": "Alejandro Escamilla"}]},
	reaction_count: 0,
	impacter_id: 1,
	published_at: '',
	created_at: '',
	updated_at: '',
}

export const mockDeletedPosts = [
  {...mockPost},
  {
    post_id: 2,
    description: 'test description',
    type: 'IMAGES',
    status: 'DELETED',
    data: {"media": [{"image": "https://picsum.photos/id/1/5616/3744", "width": 5616, "height": 3744, "version": "2019-03-14", "description": "Alejandro Escamilla"}]},
    reaction_count: 0,
    impacter_id: 2,
    published_at: '',
    created_at: '',
    updated_at: '',
  }
]

export const mockPostsByImpacter = [
  {...mockPost},
  {...mockPost}
]

export const mockSavePost = {
  description: 'Saved post test',
  type: 'IMAGES',
  status: 'VISIBLE',
  reaction_count: 0,
  data: '{"media": [{"image": "https://test.com", "width": 1000, "height": 2000, "version": "2019-03-14", "description": "Test Escamilla"}]}', 
  published_at: null,
  impacter_id: 1,
}

export const mockUpdatePost = {
  post_id: 1,
  type: 'IMAGES',	
  description: 'Updated post',
  status: 'VISIBLE',
  reaction_count: 0,
  data: '{"media": [{"image": "https://test.com", "width": 1000, "height": 2000, "version": "2019-03-14", "description": "Test Escamilla"}]}', 
  published_at: null
}


