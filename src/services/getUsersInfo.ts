import { UserIdentification } from '@/types';
import axios from 'axios';

// since the function is marked as async, it returns a Promise - so the return type must be wrapped in Promise<...>
export async function getUsersInfo(id?: number): Promise<UserIdentification[]> {
  const url = id
    ? `${process.env.EXPO_PUBLIC_API_URL}/users/?id=${id}`
    : `${process.env.EXPO_PUBLIC_API_URL}/users`;
  try {
    const response = await axios.get(url, { timeout: 20000 });
    return response.data;
  } catch {
    throw new Error('Request failed');
  }
}
