import { User } from "./user";

export interface Record {
    _id: string,
    artist: string,
    title: string,
    year: number,
    style: string,
    imageUrl: string,
    _createdOn: number,
    _ownerId: User
}