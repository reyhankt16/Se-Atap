export type Household = { id: string; name: string; created_at: string };

export type Member = {
  id: string;
  household_id: string;
  user_id: string | null;
  name: string;
  color: string;
  is_adult: boolean;
  can_read: boolean;
  created_at: string;
};

export type EventRow = {
  id: string;
  household_id: string;
  member_id: string | null;
  title: string;
  starts_at: string;
  ends_at: string | null;
  is_household: boolean;
  remind_at: string | null;
  created_by: string;
};

export type Task = {
  id: string;
  household_id: string;
  member_id: string | null;
  title: string;
  icon: string | null;
  recur: "daily" | "weekly" | null;
  due_date: string | null;
  created_by: string;
};

export type TaskLog = { id: string; task_id: string; member_id: string; done_on: string };

export type Item = {
  id: string;
  household_id: string;
  name: string;
  location: string | null;
  is_routine: boolean;
  needed: boolean;
  checked_at: string | null;
  added_by: string;
};

export type ExpenseCategory = "wajib" | "rumah" | "senang";

export type Expense = {
  id: string;
  household_id: string;
  amount_idr: number;
  category: ExpenseCategory;
  note: string | null;
  spent_on: string;
  added_by: string;
};

export type Note = {
  id: string;
  household_id: string;
  title: string;
  body: string | null;
  photo_path: string | null;
  created_by: string;
  created_at: string;
};
