export interface EducationLevel {
  id: string;
  name: string;
  code: string;
  description?: string;
  order: number;
  is_active: boolean;
}

export interface Grade {
  id: string;
  level_id: string;
  name: string;
  code: string;
  description?: string;
  order: number;
  is_active: boolean;
}

export interface Topic {
  id: string;
  grade_id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  thumbnail_url?: string;
  is_active: boolean;
}

export interface Material {
  id: string;
  topic_id: string;
  title: string;
  slug: string;
  description?: string;
  content_type: "pdf" | "document" | "presentation" | "video" | "spreadsheet" | "other";
  drive_url: string;
  drive_file_id?: string;
  thumbnail_url?: string;
  estimated_duration?: number;
  order: number;
  is_active: boolean;
  published_at?: string;
}

export interface Quiz {
  id: string;
  grade_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  is_active: boolean;
}

export interface PublicQuiz {
  id: string;
  question: string;
  options: string[];
  explanation: string;
}
