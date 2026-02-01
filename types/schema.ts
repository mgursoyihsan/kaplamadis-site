export interface Clinic {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    logo: string; // UUID of the file
    social_media: any;
}

export interface Doctor {
    id: string;
    full_name: string;
    slug: string;
    specialty: string;
    bio: string;
    avatar: string; // UUID
    clinic: Clinic | string; // M2O
}

export interface Treatment {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover_image: string; // UUID
    faq: { question: string; answer: string }[];
}

export interface TreatmentPrice {
    id: string;
    amount: number;
    currency: string;
    is_active: boolean;
    treatment_id: Treatment | string;
    clinic_id: Clinic | string;
}

export interface Schema {
    clinic: Clinic[];
    doctor: Doctor[];
    treatment: Treatment[];
    treatment_price: TreatmentPrice[];
}
