import { createDirectus, rest } from '@directus/sdk';
import { Schema } from '@/types/schema';

// Client Initialization
const directus = createDirectus<Schema>(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8055')
    .with(rest());

export default directus;

// Helper function to get image URL
export const getImageUrl = (fileId: string | object) => {
    if (!fileId) return null;
    const id = typeof fileId === 'object' && 'id' in fileId ? (fileId as any).id : fileId;
    return `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`;
};

