export interface MemberAreaModule {
  module_id: string;
  name: string;
  sequence: number;
  is_extra: boolean;
  is_extra_paid: boolean;
  is_public: boolean;
  classes: string[];
  total_pages: number;
}

export interface MemberAreaPage {
  page_id: string;
  name: string;
  page_order: number;
  type: "CONTENT" | "ADVERTISEMENT" | "QUIZ" | "WEBINAR";
  is_published: boolean;
  total_comments: number;
  rates_average: number;
  rates: Array<{
    rate: 1 | 2 | 3 | 4 | 5;
    total: number;
  }>;
  has_media: boolean;
  liberation_type?: "BY_DAYS" | "BY_DATE";
  liberation_date?: string;
  liberation_days?: number;
  has_duration: boolean;
  days_of_duration?: number;
}

export interface MemberAreaStudent {
  user_id: string;
  engagement: string;
  name: string;
  email: string;
  last_access_date: number;
  role: "STUDENT" | "FREE_STUDENT" | "OWNER" | "ADMIN" | "CONTENT_EDITOR" | "MODERATOR";
  first_access_date: number;
  locale: string;
  plus_access: "WITHOUT_PLUS_ACCESS" | "HOLDER" | "HOLDER_WITH_DEPENDENTS" | "HOLDER_WITHOUT_DEPENDENTS" | "DEPENDENT";
  progress: {
    completed_percentage: number;
    total: number;
    completed: number;
  };
  status: "ACTIVE" | "BLOCKED" | "BLOCKED_BY_OWNER" | "OVERDUE";
  access_count: number;
  is_deletable: boolean;
  class_id: string;
  type: "BUYER" | "IMPORTED" | "FREE" | "OWNER" | "GUEST";
}
