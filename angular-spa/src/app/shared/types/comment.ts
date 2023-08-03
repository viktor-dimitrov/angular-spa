


import { User } from "./user" 

export interface Comment {
    _id: string,
    _ownerId: User,
    _recordId: string,
    text: string,
    _createdOn: number,
    _updatedOn: number,
    
}