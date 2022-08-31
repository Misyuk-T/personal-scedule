export type UserId = {
  id: string;
};

export type OwnerId = {
  ownerId: string;
};

export type UserName = {
  name: string;
};

export interface UserInformation extends UserName {
  name: string;
  email: string;
  website?: string;
  statement?: string;
}

export interface User extends UserId, OwnerId, UserInformation {
  photo: string;
  schedules: string[];
}
