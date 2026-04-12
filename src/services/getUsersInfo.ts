import { UserIdentification } from '@/types';

export async function getUsersInfo(id?: number): Promise<UserIdentification[]> {
  const url = id
    ? `${process.env.EXPO_PUBLIC_API_URL}/users/?id=${id}`
    : `${process.env.EXPO_PUBLIC_API_URL}/users`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}
