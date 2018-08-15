export enum Path {
  Post = '/posts'
}
export interface Post {
  title: string,
  body: string,
  authorID: string,
  isPublished: boolean
}
