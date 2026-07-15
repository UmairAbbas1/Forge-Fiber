-- Seed Customers
insert into public.customers (id, name) values
  ('d3b07384-d113-4f9e-bc43-261622384a01', 'Levi Strauss & Co.'),
  ('d3b07384-d113-4f9e-bc43-261622384a02', 'H&M Group'),
  ('d3b07384-d113-4f9e-bc43-261622384a03', 'Uniqlo Global'),
  ('d3b07384-d113-4f9e-bc43-261622384a04', 'Zara Denim'),
  ('d3b07384-d113-4f9e-bc43-261622384a05', 'Gap Inc.'),
  ('d3b07384-d113-4f9e-bc43-261622384a06', 'Diesel S.p.A.'),
  ('d3b07384-d113-4f9e-bc43-261622384a07', 'Nudie Jeans')
on conflict (name) do nothing;

-- Seed Orders (17 realistic orders)
insert into public.orders (order_id, customer_name, PO_number, tech_pack_ref, size_breakdown, status, created_date, current_stage, qty) values
  ('FF-2601', 'Levi Strauss & Co.', 'PO-30842', 'TP-1002', '28-38', 'In Production', '2026-06-01', 7, 1800),
  ('FF-2602', 'Levi Strauss & Co.', 'PO-30843', 'TP-1002', '28-38', 'Shipped', '2026-05-15', 13, 2500),
  ('FF-2603', 'H&M Group', 'PO-44821', 'TP-4091', 'S-XXL', 'In Production', '2026-06-05', 10, 3200),
  ('FF-2604', 'Uniqlo Global', 'PO-98124', 'TP-8871', '30-40', 'In Production', '2026-06-10', 5, 1200),
  ('FF-2605', 'Zara Denim', 'PO-11234', 'TP-2234', '26-36', 'Open', '2026-06-25', 1, 900),
  ('FF-2606', 'Gap Inc.', 'PO-55421', 'TP-5091', 'XS-XL', 'In Production', '2026-06-12', 3, 2000),
  ('FF-2607', 'Diesel S.p.A.', 'PO-66712', 'TP-3091', '30-40', 'In Production', '2026-06-14', 9, 1500),
  ('FF-2608', 'Nudie Jeans', 'PO-77821', 'TP-9012', '28-38', 'In Production', '2026-06-16', 6, 800),
  ('FF-2609', 'Levi Strauss & Co.', 'PO-30848', 'TP-1002', '28-38', 'On Hold', '2026-05-20', 12, 1000),
  ('FF-2610', 'H&M Group', 'PO-44825', 'TP-4091', 'S-XXL', 'Shipped', '2026-05-10', 13, 4000),
  ('FF-2611', 'Uniqlo Global', 'PO-98128', 'TP-8871', '30-40', 'In Production', '2026-06-18', 11, 2400),
  ('FF-2612', 'Zara Denim', 'PO-11238', 'TP-2234', '26-36', 'In Production', '2026-06-20', 8, 1100),
  ('FF-2613', 'Gap Inc.', 'PO-55428', 'TP-5091', 'XS-XL', 'In Production', '2026-06-22', 12, 1300),
  ('FF-2614', 'Diesel S.p.A.', 'PO-66718', 'TP-3091', '30-40', 'Open', '2026-07-02', 2, 700),
  ('FF-2615', 'Nudie Jeans', 'PO-77828', 'TP-9012', '28-38', 'In Production', '2026-06-24', 4, 1600),
  ('FF-2616', 'Levi Strauss & Co.', 'PO-30855', 'TP-1002', '28-38', 'In Production', '2026-06-26', 13, 2200),
  ('FF-2617', 'Uniqlo Global', 'PO-98135', 'TP-8871', '30-40', 'Open', '2026-07-05', 1, 1500)
on conflict (order_id) do update set
  customer_name = excluded.customer_name,
  PO_number = excluded.PO_number,
  tech_pack_ref = excluded.tech_pack_ref,
  size_breakdown = excluded.size_breakdown,
  status = excluded.status,
  created_date = excluded.created_date,
  current_stage = excluded.current_stage,
  qty = excluded.qty;

-- Seed Materials (Reconciliation inventory logs)
insert into public.materials (material_id, order_id, type, description, qty_received, inspection_status, received_date) values
  ('MAT-FF-2601-0', 'FF-2601', 'Fabric', '12oz Denim Indigo', 2000, 'Approved', '2026-06-02'),
  ('MAT-FF-2601-1', 'FF-2601', 'Trim', 'YKK Brass Zipper', 1850, 'Approved', '2026-06-03'),
  ('MAT-FF-2601-2', 'FF-2601', 'Accessory', 'Leather Patch Set', 1800, 'Approved', '2026-06-03'),
  
  ('MAT-FF-2603-0', 'FF-2603', 'Fabric', 'Black Cotton Twill', 3500, 'Approved', '2026-06-06'),
  ('MAT-FF-2603-1', 'FF-2603', 'Trim', 'Gunmetal Button set', 3300, 'Approved', '2026-06-07'),
  
  ('MAT-FF-2604-0', 'FF-2604', 'Fabric', 'Raw Selvedge Denim', 1300, 'Approved', '2026-06-11'),
  ('MAT-FF-2604-1', 'FF-2604', 'Trim', 'Red Stitching Thread', 20, 'Approved', '2026-06-12'),
  
  ('MAT-FF-2606-0', 'FF-2606', 'Fabric', 'Stretch Denim Wash', 2100, 'Pending', '2026-06-13'),
  ('MAT-FF-2606-1', 'FF-2606', 'Trim', 'Copper Rivet Box', 5, 'Pending', '2026-06-13'),
  
  ('MAT-FF-2607-0', 'FF-2607', 'Fabric', 'Bleached Indigo Canvas', 1700, 'Approved', '2026-06-15'),
  
  ('MAT-FF-2608-0', 'FF-2608', 'Fabric', 'Organic Cotton Indigo', 900, 'Approved', '2026-06-17'),
  
  ('MAT-FF-2609-0', 'FF-2609', 'Fabric', 'Indigo Denim Heavy', 1100, 'Approved', '2026-05-22'),
  ('MAT-FF-2609-1', 'FF-2609', 'Trim', 'Silver Button Set', 1050, 'Hold', '2026-05-23'),
  
  ('MAT-FF-2611-0', 'FF-2611', 'Fabric', 'Light Blue Denim', 2600, 'Approved', '2026-06-19'),
  ('MAT-FF-2612-0', 'FF-2612', 'Fabric', 'Vintage Denim Twill', 1200, 'Approved', '2026-06-21'),
  ('MAT-FF-2613-0', 'FF-2613', 'Fabric', 'Medium Wash Cotton', 1400, 'Approved', '2026-06-23'),
  ('MAT-FF-2615-0', 'FF-2615', 'Fabric', 'Black Denim Heavy', 1700, 'Approved', '2026-06-25')
on conflict (material_id) do update set
  type = excluded.type,
  description = excluded.description,
  qty_received = excluded.qty_received,
  inspection_status = excluded.inspection_status,
  received_date = excluded.received_date;

-- Seed Cutting Records (Stage 5+)
insert into public.cutting_records (cut_id, order_id, panels_cut, size, color, cutter_used, status, first_cut_approval_status) values
  ('CUT-FF-2601', 'FF-2601', 1800, '28-38', 'Indigo Rinse', '40 ft Auto Cutter A', 'Completed', 'Approved'),
  ('CUT-FF-2602', 'FF-2602', 2500, '28-38', 'Vintage Blue', '40 ft Auto Cutter A', 'Completed', 'Approved'),
  ('CUT-FF-2603', 'FF-2603', 3200, 'S-XXL', 'Jet Black', '40 ft Auto Cutter B', 'Completed', 'Approved'),
  ('CUT-FF-2604', 'FF-2604', 300, '30-40', 'Indigo Rinse', 'Manual Cut Table 1', 'In Progress', 'Pending'),
  ('CUT-FF-2607', 'FF-2607', 1500, '30-40', 'Stone Wash', '40 ft Auto Cutter B', 'Completed', 'Approved'),
  ('CUT-FF-2608', 'FF-2608', 800, '28-38', 'Mid Blue', 'Manual Cut Table 1', 'Completed', 'Approved'),
  ('CUT-FF-2609', 'FF-2609', 1000, '28-38', 'Indigo Rinse', '40 ft Auto Cutter A', 'Completed', 'Approved'),
  ('CUT-FF-2610', 'FF-2610', 4000, 'S-XXL', 'Jet Black', '40 ft Auto Cutter B', 'Completed', 'Approved'),
  ('CUT-FF-2611', 'FF-2611', 2400, '30-40', 'Mid Blue', '40 ft Auto Cutter A', 'Completed', 'Approved'),
  ('CUT-FF-2612', 'FF-2612', 1100, '26-36', 'Stone Wash', '40 ft Auto Cutter B', 'Completed', 'Approved'),
  ('CUT-FF-2613', 'FF-2613', 1300, 'XS-XL', 'Mid Blue', '40 ft Auto Cutter A', 'Completed', 'Approved'),
  ('CUT-FF-2616', 'FF-2616', 2200, '28-38', 'Vintage Blue', '40 ft Auto Cutter A', 'Completed', 'Approved')
on conflict (cut_id) do update set
  panels_cut = excluded.panels_cut,
  size = excluded.size,
  color = excluded.color,
  cutter_used = excluded.cutter_used,
  status = excluded.status,
  first_cut_approval_status = excluded.first_cut_approval_status;

-- Seed Sewing Bundles (Stage 6 - 8)
insert into public.sewing_bundles (bundle_id, order_id, line_number, operator_count, status, inline_qc_result, qty) values
  ('BND-FF-2601-0', 'FF-2601', 3, 12, 'Active', 'Pass', 200),
  ('BND-FF-2601-1', 'FF-2601', 3, 10, 'Active', 'Rework', 180),
  ('BND-FF-2601-2', 'FF-2601', 4, 11, 'Completed', 'Pass', 220),
  
  ('BND-FF-2608-0', 'FF-2608', 1, 8, 'Active', 'Pass', 120),
  ('BND-FF-2608-1', 'FF-2608', 2, 7, 'Active', 'Rework', 100),
  
  ('BND-FF-2612-0', 'FF-2612', 6, 12, 'Completed', 'Pass', 240),
  ('BND-FF-2612-1', 'FF-2612', 6, 11, 'Active', 'Reject', 50)
on conflict (bundle_id) do update set
  line_number = excluded.line_number,
  operator_count = excluded.operator_count,
  status = excluded.status,
  inline_qc_result = excluded.inline_qc_result,
  qty = excluded.qty;

-- Seed Wash Batches (Stage 9 - 11)
insert into public.wash_batches (batch_id, order_id, pcs_qty, stage, equipment_used) values
  ('WSH-FF-2601', 'FF-2601', 1400, 'Approved', 'Industrial Washer #3'),
  ('WSH-FF-2603', 'FF-2603', 3000, 'Wash', 'Ozone Booth'),
  ('WSH-FF-2607', 'FF-2607', 1500, 'Finish', 'Jeanologia Laser'),
  ('WSH-FF-2611', 'FF-2611', 2400, 'Dry', 'Spray Booth'),
  ('WSH-FF-2612', 'FF-2612', 800, 'Approved', 'Steam Presser')
on conflict (batch_id) do update set
  pcs_qty = excluded.pcs_qty,
  stage = excluded.stage,
  equipment_used = excluded.equipment_used;

-- Seed QC Records (AQL inspections)
insert into public.qc_records (qc_id, order_id, stage_checkpoint, result, inspected_qty, pass_qty, reject_qty, inspected_date) values
  ('QC-1001', 'FF-2601', 'Inline Sewing QC', 'Pass', 200, 196, 4, '2026-06-10'),
  ('QC-1002', 'FF-2601', 'First Cut Approval', 'Pass', 50, 50, 0, '2026-06-05'),
  ('QC-1003', 'FF-2603', 'Material Check', 'Pass', 100, 98, 2, '2026-06-08'),
  ('QC-1004', 'FF-2607', 'Inline Sewing QC', 'Rework', 250, 230, 20, '2026-06-20'),
  ('QC-1005', 'FF-2611', 'Wash-Finish Approval', 'Pass', 300, 295, 5, '2026-06-25'),
  ('QC-1006', 'FF-2612', 'Inline Sewing QC', 'Reject', 150, 130, 20, '2026-06-22')
on conflict (qc_id) do update set
  stage_checkpoint = excluded.stage_checkpoint,
  result = excluded.result,
  inspected_qty = excluded.inspected_qty,
  pass_qty = excluded.pass_qty,
  reject_qty = excluded.reject_qty,
  inspected_date = excluded.inspected_date;

-- Seed Carton packing & dispatch stages (Stage 12 - 13)
insert into public.cartons (carton_id, order_id, packed_qty, dispatch_status, pod_reference, ship_date) values
  ('CTN-5001', 'FF-2602', 80, 'Shipped', 'POD-99214', '2026-05-28'),
  ('CTN-5002', 'FF-2602', 80, 'Shipped', 'POD-99214', '2026-05-28'),
  ('CTN-5003', 'FF-2609', 100, 'Ready', '', ''),
  ('CTN-5004', 'FF-2610', 90, 'Shipped', 'POD-10245', '2026-05-20'),
  ('CTN-5005', 'FF-2613', 110, 'Ready', '', ''),
  ('CTN-5006', 'FF-2616', 80, 'Shipped', 'POD-33045', '2026-07-02')
on conflict (carton_id) do update set
  packed_qty = excluded.packed_qty,
  dispatch_status = excluded.dispatch_status,
  pod_reference = excluded.pod_reference,
  ship_date = excluded.ship_date;
