import { PlaceLocation, City } from './location.model';

export interface Repbase {
    id: string;
    title: string;
    location: PlaceLocation;
    website?: string;
    priceFrom?: number;
    description?: string;
    phone: string;
    username: string;
    userId: string;
    city: City;
}


