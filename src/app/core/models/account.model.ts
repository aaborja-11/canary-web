import { UUID } from 'crypto';

export interface Account {
  id: UUID;
  firstname: string;
  lastname: string;
  username: string;
}
