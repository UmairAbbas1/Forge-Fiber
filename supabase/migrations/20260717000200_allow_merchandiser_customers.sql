-- Allow merchandiser to add and edit customers/brands on the order dashboard
create policy "Allow merchandiser full access on customers" on public.customers
  for all using (public.check_user_role('merchandiser'));
