export type UserId = {
  id: string;
};

export type OwnerId = {
  ownerId: string;
};

export type UserName = {
  name: string;
};

export interface User extends UserId, UserName, OwnerId {
  email: string;
  photo: string;
  statement?: string;
  website?: string;
  schedules: string[];
}
