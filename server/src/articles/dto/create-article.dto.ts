export class CreateArticleDto {
  id: string;

  author: string;

  title: string;

  categoryId: number;

  tagIds: number[];

  content: string;

  createdAt: Date;

  updatedAt: Date;
}
