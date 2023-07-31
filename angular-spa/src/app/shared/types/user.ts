import { Record } from "./record";

export interface User {
    _id: string,
    username: string,
    email: string,
    phone: string,
    imageUrl: string,
    accessToken: string | undefined,
    myPosts: Record[] | undefined
}

