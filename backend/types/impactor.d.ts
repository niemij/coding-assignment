declare module '@types/impacter' {
  export interface Impacter {
    impacter_id: number;
    name: string;
    bio: string;
    profile_image: string;
    image?: string;
    status: 'ONBOARDING' | 'ACTIVE' | 'INACTIVE' | 'DELETED';
    created_at: string;
    updated_at: string;
  }
}
