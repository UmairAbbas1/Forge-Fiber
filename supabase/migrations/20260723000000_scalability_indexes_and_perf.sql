-- Production PostgreSQL Performance & Index Optimization ($0 Cost)

-- 1. Composite Index on Orders (Accelerates customer scoping & status filtering)
CREATE INDEX IF NOT EXISTS idx_orders_customer_status ON public.orders (customer_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_current_stage ON public.orders (current_stage);
CREATE INDEX IF NOT EXISTS idx_orders_customer_name ON public.orders (LOWER(customer_name));

-- 2. Composite Index on WIP Logs (Accelerates 13-stage manufacturing queries & audits)
CREATE INDEX IF NOT EXISTS idx_wip_logs_order_stage ON public.wip_logs (order_id, stage_id);
CREATE INDEX IF NOT EXISTS idx_wip_logs_created_date ON public.wip_logs (log_date);

-- 3. Composite Index on QC Records (Accelerates quality checkpoint lookups)
CREATE INDEX IF NOT EXISTS idx_qc_records_order_checkpoint ON public.qc_records (order_id, stage_checkpoint);

-- 4. Composite Index on Cartons (Accelerates dispatch & shipping status calculations)
CREATE INDEX IF NOT EXISTS idx_cartons_status_ship ON public.cartons (dispatch_status, ship_date);

-- 5. Composite Index on Materials (Accelerates fabric intake & inspection status lookups)
CREATE INDEX IF NOT EXISTS idx_materials_order_status ON public.materials (order_id, inspection_status);
