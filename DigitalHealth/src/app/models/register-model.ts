import { Beruf } from './beruf-model';
import { Health } from './healt-model';
import { Payment } from './payment-model';
import { User } from './user-model';
import { Account } from './account-model';

export interface Register {
  user: User;
  account: Account;
  payment: Payment;
  beruf: Beruf;
  health: Health;
}
