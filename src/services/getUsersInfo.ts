import { UserIdentification } from '@/types';

export async function getUsersInfo(): Promise<UserIdentification[]> {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}
