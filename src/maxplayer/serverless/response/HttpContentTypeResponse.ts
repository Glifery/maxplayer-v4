export interface HttpContentTypeResponse {
    statusCode: number;
    headers: {
        'Content-Type': string
    },
    body: string;
}