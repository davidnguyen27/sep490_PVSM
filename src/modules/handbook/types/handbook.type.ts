export interface Handbook {
  handbookId: number | null;
  title: string;
  introduction: string;
  highlight: string;
  content: string;
  importantNote: string;
  imageUrl: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: boolean;
}
