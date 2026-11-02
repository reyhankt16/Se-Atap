-- SeAtap schema — DB-1..DB-9. Postgres/Supabase. Run once in the Supabase SQL editor.

create table households (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  color text not null default '#3b82f6',
  is_adult boolean not null default true,
  can_read boolean not null default true,
  created_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  member_id uuid references members(id) on delete set null,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  is_household boolean not null default false,
  remind_at timestamptz,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  member_id uuid references members(id) on delete set null,
  title text not null,
  icon text,
  recur text check (recur in ('daily','weekly')),
  due_date date,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table task_logs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete cascade,
  member_id uuid not null references members(id) on delete cascade,
  done_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique (task_id, member_id, done_on)
);

create table items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  name text not null,
  location text,
  is_routine boolean not null default false,
  needed boolean not null default true,
  checked_at timestamptz,
  added_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table expenses (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  amount_idr integer not null check (amount_idr >= 0),
  category text not null check (category in ('wajib','rumah','senang')),
  note text,
  spent_on date not null default current_date,
  added_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table notes (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  title text not null,
  body text,
  photo_path text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

-- DB-9: one rule, repeated per table — a user may read/write a row only if
-- they belong to that row's household (via members.user_id).
create or replace function is_household_member(hh uuid)
returns boolean language sql security definer stable as $$
  select exists (
    select 1 from members m where m.household_id = hh and m.user_id = auth.uid()
  );
$$;

-- R7: nama rumah perlu kebaca di halaman undangan sebelum orangnya jadi anggota.
create or replace function household_name(hh uuid)
returns text language sql security definer stable as $$
  select name from households where id = hh;
$$;

alter table households enable row level security;
alter table members enable row level security;
alter table events enable row level security;
alter table tasks enable row level security;
alter table task_logs enable row level security;
alter table items enable row level security;
alter table expenses enable row level security;
alter table notes enable row level security;

create policy households_select on households for select
  using (is_household_member(id));
create policy households_insert on households for insert
  with check (auth.uid() is not null);
create policy households_update on households for update
  using (is_household_member(id));

-- insert allows two cases: joining yourself (via an invite link — R7), or an
-- existing member adding a no-account member (a child, user_id null).
create policy members_select on members for select
  using (is_household_member(household_id));
create policy members_insert on members for insert
  with check (user_id = auth.uid() or is_household_member(household_id));
create policy members_update on members for update
  using (is_household_member(household_id));
create policy members_delete on members for delete
  using (is_household_member(household_id));

create policy events_all on events for all
  using (is_household_member(household_id))
  with check (is_household_member(household_id));

create policy tasks_all on tasks for all
  using (is_household_member(household_id))
  with check (is_household_member(household_id));

create policy task_logs_all on task_logs for all
  using (is_household_member((select household_id from tasks where tasks.id = task_id)))
  with check (is_household_member((select household_id from tasks where tasks.id = task_id)));

create policy items_all on items for all
  using (is_household_member(household_id))
  with check (is_household_member(household_id));

create policy expenses_all on expenses for all
  using (is_household_member(household_id))
  with check (is_household_member(household_id));

create policy notes_all on notes for all
  using (is_household_member(household_id))
  with check (is_household_member(household_id));

-- Storage bucket for M6 note photos.
insert into storage.buckets (id, name, public) values ('notes', 'notes', true)
  on conflict (id) do nothing;
create policy notes_photos_read on storage.objects for select using (bucket_id = 'notes');
create policy notes_photos_write on storage.objects for insert with check (bucket_id = 'notes' and auth.uid() is not null);

-- Realtime for M3-4 (shopping list sync).
alter publication supabase_realtime add table items;
