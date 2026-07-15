-- Create custom types/enums if they don't exist
do $$
begin
  if not exists (select 1 from pg_type where typname = 'role_type') then
    create type public.role_type as enum ('admin', 'merchandiser', 'production', 'qc', 'customer');
  end if;
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('Open', 'In Production', 'On Hold', 'Shipped');
  end if;
  if not exists (select 1 from pg_type where typname = 'qc_result') then
    create type public.qc_result as enum ('Pass', 'Rework', 'Reject');
  end if;
  if not exists (select 1 from pg_type where typname = 'material_inspection_status') then
    create type public.material_inspection_status as enum ('Pending', 'Approved', 'Hold');
  end if;
  if not exists (select 1 from pg_type where typname = 'cutting_status') then
    create type public.cutting_status as enum ('In Progress', 'Completed');
  end if;
  if not exists (select 1 from pg_type where typname = 'first_cut_approval') then
    create type public.first_cut_approval as enum ('Pending', 'Approved', 'Rejected');
  end if;
  if not exists (select 1 from pg_type where typname = 'sewing_status') then
    create type public.sewing_status as enum ('Active', 'Completed');
  end if;
  if not exists (select 1 from pg_type where typname = 'wash_stage') then
    create type public.wash_stage as enum ('Wash', 'Dry', 'Finish', 'Approved');
  end if;
  if not exists (select 1 from pg_type where typname = 'dispatch_status') then
    create type public.dispatch_status as enum ('Ready', 'Shipped');
  end if;
end
$$;

-- Create Customers table
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  role public.role_type not null default 'customer'::public.role_type,
  customer_id uuid references public.customers(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Orders table
create table if not exists public.orders (
  order_id text primary key,
  customer_name text not null,
  PO_number text not null,
  tech_pack_ref text not null,
  size_breakdown text not null,
  status public.order_status not null default 'Open'::public.order_status,
  created_date text not null,
  current_stage integer not null default 1,
  qty integer not null default 100
);

-- Create Materials table
create table if not exists public.materials (
  material_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  type text not null,
  description text not null,
  qty_received integer not null,
  inspection_status public.material_inspection_status not null default 'Pending'::public.material_inspection_status,
  received_date text not null
);

-- Create Cutting Records table
create table if not exists public.cutting_records (
  cut_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  panels_cut integer not null,
  size text not null,
  color text not null,
  cutter_used text not null,
  status public.cutting_status not null default 'In Progress'::public.cutting_status,
  first_cut_approval_status public.first_cut_approval not null default 'Pending'::public.first_cut_approval
);

-- Create Sewing Bundles table
create table if not exists public.sewing_bundles (
  bundle_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  line_number integer not null,
  operator_count integer not null,
  status public.sewing_status not null default 'Active'::public.sewing_status,
  inline_qc_result public.qc_result not null default 'Pass'::public.qc_result,
  qty integer not null
);

-- Create Wash Batches table
create table if not exists public.wash_batches (
  batch_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  pcs_qty integer not null,
  stage public.wash_stage not null default 'Wash'::public.wash_stage,
  equipment_used text not null
);

-- Create QC Records table
create table if not exists public.qc_records (
  qc_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  stage_checkpoint text not null,
  result public.qc_result not null default 'Pass'::public.qc_result,
  inspected_qty integer not null,
  pass_qty integer not null,
  reject_qty integer not null,
  inspected_date text not null
);

-- Create Cartons table
create table if not exists public.cartons (
  carton_id text primary key,
  order_id text not null references public.orders(order_id) on delete cascade,
  packed_qty integer not null,
  dispatch_status public.dispatch_status not null default 'Ready'::public.dispatch_status,
  pod_reference text,
  ship_date text
);

-- Create trigger function to handle auth user profiles sync
create or replace function public.handle_new_user()
returns trigger as $$
declare
  assigned_role public.role_type;
  assigned_customer_id uuid;
begin
  assigned_role := coalesce((new.raw_user_meta_data->>'role')::public.role_type, 'customer'::public.role_type);
  assigned_customer_id := (new.raw_user_meta_data->>'customer_id')::uuid;

  insert into public.profiles (id, email, role, customer_id)
  values (new.id, new.email, assigned_role, assigned_customer_id);
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable RLS on all tables
alter table public.customers enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.materials enable row level security;
alter table public.cutting_records enable row level security;
alter table public.sewing_bundles enable row level security;
alter table public.wash_batches enable row level security;
alter table public.qc_records enable row level security;
alter table public.cartons enable row level security;

-- Setup RLS Policies

-- Helper checks for user roles
create or replace function public.check_user_role(role_name public.role_type)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = role_name
  );
$$ language sql security definer;

-- 1. Profiles Table Policies
create policy "Allow users to read their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Allow admins full access on profiles" on public.profiles
  for all using (public.check_user_role('admin'));

-- 2. Customers Table Policies
create policy "Allow authenticated users select customers" on public.customers
  for select using (auth.role() = 'authenticated');

create policy "Allow admins full access on customers" on public.customers
  for all using (public.check_user_role('admin'));

-- 3. Orders Table Policies
create policy "Allow admin full access on orders" on public.orders
  for all using (public.check_user_role('admin'));

create policy "Allow merchandiser full access on orders" on public.orders
  for all using (public.check_user_role('merchandiser'));

create policy "Allow production & qc select on orders" on public.orders
  for select using (public.check_user_role('production') or public.check_user_role('qc'));

create policy "Allow customer select their own orders" on public.orders
  for select using (
    exists (
      select 1 from public.profiles p
      join public.customers c on p.customer_id = c.id
      where p.id = auth.uid() and public.orders.customer_name = c.name
    )
  );

-- 4. Materials Table Policies
create policy "Allow admin full access on materials" on public.materials
  for all using (public.check_user_role('admin'));

create policy "Allow production full access on materials" on public.materials
  for all using (public.check_user_role('production'));

create policy "Allow merchandiser & qc select on materials" on public.materials
  for select using (public.check_user_role('merchandiser') or public.check_user_role('qc'));

create policy "Allow customer select scoped materials" on public.materials
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.materials.order_id
    )
  );

-- 5. Cutting Records Policies
create policy "Allow admin full access on cutting_records" on public.cutting_records
  for all using (public.check_user_role('admin'));

create policy "Allow production full access on cutting_records" on public.cutting_records
  for all using (public.check_user_role('production'));

create policy "Allow merchandiser & qc select on cutting_records" on public.cutting_records
  for select using (public.check_user_role('merchandiser') or public.check_user_role('qc'));

create policy "Allow customer select scoped cutting_records" on public.cutting_records
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.cutting_records.order_id
    )
  );

-- 6. Sewing Bundles Policies
create policy "Allow admin full access on sewing_bundles" on public.sewing_bundles
  for all using (public.check_user_role('admin'));

create policy "Allow production full access on sewing_bundles" on public.sewing_bundles
  for all using (public.check_user_role('production'));

create policy "Allow merchandiser & qc select on sewing_bundles" on public.sewing_bundles
  for select using (public.check_user_role('merchandiser') or public.check_user_role('qc'));

create policy "Allow customer select scoped sewing_bundles" on public.sewing_bundles
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.sewing_bundles.order_id
    )
  );

-- 7. Wash Batches Policies
create policy "Allow admin full access on wash_batches" on public.wash_batches
  for all using (public.check_user_role('admin'));

create policy "Allow production full access on wash_batches" on public.wash_batches
  for all using (public.check_user_role('production'));

create policy "Allow merchandiser & qc select on wash_batches" on public.wash_batches
  for select using (public.check_user_role('merchandiser') or public.check_user_role('qc'));

create policy "Allow customer select scoped wash_batches" on public.wash_batches
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.wash_batches.order_id
    )
  );

-- 8. QC Records Policies
create policy "Allow admin full access on qc_records" on public.qc_records
  for all using (public.check_user_role('admin'));

create policy "Allow qc full access on qc_records" on public.qc_records
  for all using (public.check_user_role('qc'));

create policy "Allow merchandiser, production select on qc_records" on public.qc_records
  for select using (public.check_user_role('merchandiser') or public.check_user_role('production'));

create policy "Allow customer select scoped qc_records" on public.qc_records
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.qc_records.order_id
    )
  );

-- 9. Cartons Table Policies
create policy "Allow admin full access on cartons" on public.cartons
  for all using (public.check_user_role('admin'));

create policy "Allow production full access on cartons" on public.cartons
  for all using (public.check_user_role('production'));

create policy "Allow merchandiser & qc select on cartons" on public.cartons
  for select using (public.check_user_role('merchandiser') or public.check_user_role('qc'));

create policy "Allow customer select scoped cartons" on public.cartons
  for select using (
    exists (
      select 1 from public.orders o
      join public.profiles p on o.customer_name = (select name from public.customers where id = p.customer_id)
      where p.id = auth.uid() and o.order_id = public.cartons.order_id
    )
  );
