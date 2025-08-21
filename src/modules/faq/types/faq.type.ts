export interface Faq {
  faqItemId: number | null;
  question: string;
  answer: string;
  createdAt: string;
  modifiedAt: string;
  isDeleted: boolean;
}
