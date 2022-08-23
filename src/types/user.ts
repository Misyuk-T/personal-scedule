export type UserId = {
  id: string;
};

export type UserName = {
  name: string;
};

export interface User extends UserId, UserName {
  email: string;
  photo: string;
  statement?: string;
  website?: string;
}
