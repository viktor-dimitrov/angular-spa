export interface User {
    _id: string,
    userName: string,
    email: string,
    phone: string,
    imageUrl: string,
    accessToken: string | undefined,
    myPosts: string[] | undefined
}