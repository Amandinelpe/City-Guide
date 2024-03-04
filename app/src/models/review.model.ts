export interface Review {
    id: string;
    comment: string;
    rating: number;
    user: {
        id: string;
        firstName: string;
        lastName: string;
    }
}