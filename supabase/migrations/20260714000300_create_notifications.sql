create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  order_id text not null references public.orders(order_id) on delete cascade,
  type text not null,
  read boolean not null default false,
  stage_id integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Setup RLS policies
create policy "Allow admins full access on notifications" on public.notifications
  for all using (public.check_user_role('admin'));

create policy "Allow qc select on notifications" on public.notifications
  for select using (public.check_user_role('qc'));

create policy "Allow production select on notifications" on public.notifications
  for select using (public.check_user_role('production'));

create policy "Allow merchandiser select on notifications" on public.notifications
  for select using (public.check_user_role('merchandiser'));

create policy "Allow customer select scoped notifications" on public.notifications
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.notifications.order_id
    )
  );

create policy "Allow users to mark own notifications as read" on public.notifications
  for update using (auth.role() = 'authenticated');
