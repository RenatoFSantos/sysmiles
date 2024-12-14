export default interface UserAuth {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    provider: string | undefined;
    token: string;
}
