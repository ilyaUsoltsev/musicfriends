import { User } from './user.model';

export interface Post {
    id?: string;
    date?: Date;
    title: string;
    description?: string;
    imageUrl?: string;
    instrument: string;
    userId?: string;
    username?: string;
    style?: string;
    city?: string;
    mode?: 'Музыкант' | 'Группа' | 'Срочно';
}
