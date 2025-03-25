// Öğrenme Oturumu
export interface LearningSession {
    id: string;
    user_id: string;
    teacher_id: string;
    category_id: string;
    subcategory_id: string;
    start_time: Date;
    end_time: Date;
    duration: number;
    background_url: string;
}

// Konuşma
export interface Conversation {
    id: string;
    session_id: string;
    teacher_id: string;
    message_text: string;
    audio_url: string;
    sender_type: 'teacher' | 'user';
    created_at: Date;
}

// Öğretmen/Karakter
export interface Teacher {
    id: string;
    name: string;
    accent: string;
    avatar_url: string;
    voice_id: string;
    description: string;
    profile_picture: string;
    personality_traits: string[];
    teaching_style: string;
    specializations: string[];
}

// Kategori
export interface Category {
    id: string;
    name: string;
    description: string;
    difficulty_level: string;
    icon_url: string;
    is_active: boolean;
    first_background_url: string;
}

// Alt Kategori
export interface Subcategory {
    id: string;
    category_id: string;
    name: string;
    description: string;
    icon_url: string;
    image_url?: string;
    difficulty_level: string;
    vocabulary_focus: string[];
    learning_objectives: string[];
    is_active: boolean;
    scenario?: string;
    is_locked?: boolean;
}

// Konuşma Durumu
export interface ConversationState {
    isRecording: boolean;
    isProcessing: boolean;
    currentMessage: string;
    audioBlob?: Blob;
}

// Oturum Durumu
export interface SessionState {
    isActive: boolean;
    startTime?: Date;
    duration: number;
    messages: Conversation[];
} 