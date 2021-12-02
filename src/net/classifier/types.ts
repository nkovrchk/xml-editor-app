export interface IClassifierPostResponse {
    success: boolean;
    data?: { category: string };
    errors?: string[];
}
