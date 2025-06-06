export type AccountType = 'LDAP' | 'Local';

export interface Account {
  id: string;
  label: LabelItem[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface LabelItem {
  text: string;
}
