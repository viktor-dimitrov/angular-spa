

import { Record } from "./record"
import { User } from "./user" 

export interface Comment {
    _id: string,
    _ownerId: User,
    _recordId: Record,
    text: string,
    _createdOn: number,
    _updatedOn: number,
    
}