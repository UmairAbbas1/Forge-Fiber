alter table public.customers add column if not exists contact text;
alter table public.profiles add column if not exists deactivated boolean default false;
