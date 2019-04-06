import { City } from './location.model';

export interface User {
    uid?: string;
    username: string;
    email: string;
    image?: string;
    description?: string;
    password?: string;
    city?: City;
}
