import { Post } from '../models/post.model';

export const POSTS: Post[] = [
    {
        id: '1',
        date: new Date(Date.now()),
        title: 'Ищем Гитариста',
        description: 'Ищем крутого гитариста',
        instrument: 'Гитара',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        userId: '222',
        city: 'Москва',
        mode: 'Музыкант',
        style: 'Поп-рок',
        username: 'ivan222'
    },
    {
        id: '2',
        date: new Date(Date.now()),
        title: 'Ищем Скрипку',
        description: 'lorem dls;akdfj  lkdjsfa asdl;fkjasdkfj ;laskdfjals;dkfj alsdkfjaslkd',
        instrument: 'Гитара',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        userId: '222',
        city: 'Москва',
        mode: 'Музыкант',
        style: 'Поп-рок',
        username: 'ivan222'
    },
    {
        id: '3',
        date: new Date(Date.now()),
        title: 'Ищем Барабаны',
        description: 'Ищем крутого барабанщика',
        instrument: 'Барабаны',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        userId: '111',
        city: 'Москва',
        mode: 'Срочно',
        style: 'Поп-рок',
        username: 'ivan111'
    },
    {
        id: '12',
        date: new Date(Date.now()),
        title: 'Ищем drummera!',
        description: 'Ищем drums',
        instrument: 'Барабаны',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        userId: '444',
        city: 'СПБ',
        mode: 'Музыкант',
        style: 'Поп-рок',
        username: 'ivan444'
    },
    {
        id: '2фыва',
        date: new Date(Date.now()),
        title: 'Ищем base',
        description: 'base wer are looking for',
        instrument: 'Бас',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        userId: '555',
        city: 'Другой',
        mode: 'Музыкант',
        style: 'Поп-рок',
        username: 'ivan555'
    },
    {
        id: '3234234',
        date: new Date(Date.now()),
        title: 'Ищем Бас',
        description: 'Ищем бассссссс',
        imageUrl: 'http://muzplanet.com/d/63852.jpg',
        instrument: 'Бас',
        userId: '222',
        city: 'СПБ',
        mode: 'Срочно',
        style: 'Поп-рок',
        username: 'ivan222'
    }
];
