export class CreateBookDto {
  id: string;

  author: string;

  title: string;

  categoryId: string;

  tagIds: string[];

  content: string;

  createdAt: Date;

  updatedAt: Date;

  cover: string;
}
