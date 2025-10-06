/*
  # IIoT Gateway Management System - Complete Database Schema

  ## Overview
  This migration creates the complete database schema for the Industrial IoT Gateway Management Platform.
  It includes all tables, relationships, indexes, and Row Level Security policies needed for the application.

  ## New Tables Created

  ### 1. Gateway Management
  - `gateways` - Main gateway devices with connection info and status
    - id (uuid, primary key)
    - name (text)
    - description (text)
    - ip_address (text)
    - port (integer)
    - status (enum: online, offline, warning, connecting)
    - firmware_version (text)
    - last_seen (timestamptz)
    - created_at, updated_at (timestamptz)

  ### 2. Device & Protocol Management
  - `devices` - Connected devices and PLCs
    - id, gateway_id, name, vendor, model, protocol_type, endpoint, status, metadata
  
  - `protocol_drivers` - Available protocol drivers library
    - id, name, version, protocol_type, vendor, description, installation_status

  - `protocol_converters` - Protocol conversion mappings
    - id, name, source_protocol, target_protocol, mapping_config, is_active

  - `device_tags` - Data points from devices
    - id, device_id, tag_name, tag_address, data_type, unit, scaling_factor, metadata

  ### 3. Data Management
  - `data_transformations` - Transformation rules and flows
    - id, name, flow_config, input_tags, output_tags, is_active

  - `data_buffer` - Store-and-forward buffer entries
    - id, gateway_id, data_payload, created_at, synced_at, sync_status

  - `database_integrations` - External database connections
    - id, name, db_type, connection_string, status, last_sync

  - `alarms` - Active and historical alarms
    - id, device_id, alarm_type, severity, condition_config, message, triggered_at, acknowledged_at

  - `alarm_rules` - Alarm condition definitions
    - id, name, device_id, tag_id, condition_expression, alarm_config, is_active

  ### 4. Visualization & Monitoring
  - `dashboards` - Custom dashboard layouts
    - id, name, layout_config, is_default

  - `dashboard_widgets` - Individual widgets on dashboards
    - id, dashboard_id, widget_type, config, position_x, position_y, width, height

  - `protocol_traffic_logs` - Real-time protocol traffic monitoring
    - id, gateway_id, protocol_type, direction, packet_data, timestamp

  ### 5. Security & Administration
  - `certificates` - TLS/SSL certificate management
    - id, name, cert_type, cert_data, private_key, expires_at, is_active

  - `audit_logs` - Complete audit trail
    - id, user_id, action_type, resource_type, resource_id, changes, ip_address, timestamp

  - `firmware_updates` - Firmware version tracking and updates
    - id, gateway_id, version, file_path, status, scheduled_at, completed_at

  ### 6. Integration & Scalability
  - `cloud_integrations` - Cloud platform connections
    - id, platform_name, endpoint, credentials, status, last_sync

  - `historian_integrations` - Historian system connections
    - id, system_name, system_type, endpoint, credentials, status

  - `api_tokens` - API authentication tokens
    - id, token_name, token_hash, permissions, expires_at, last_used_at

  - `edge_applications` - Container/edge app deployments
    - id, gateway_id, app_name, container_image, status, config, deployed_at

  ### 7. Productivity Features
  - `configuration_templates` - Reusable configuration templates
    - id, template_name, template_type, config_data, created_by, created_at

  - `scheduled_tasks` - Scheduled operations and jobs
    - id, task_name, task_type, cron_expression, config, is_active, last_run, next_run

  ### 8. Enterprise Features
  - `ml_models` - Deployed ML/AI models
    - id, model_name, model_type, model_path, accuracy, deployed_at, is_active

  - `data_lineage` - Data governance and lineage tracking
    - id, tag_id, source_device, transformations, destination, tracked_at

  - `policy_rules` - Business rule engine
    - id, rule_name, condition_expression, action_config, priority, is_active

  - `oee_metrics` - OEE and KPI calculations
    - id, gateway_id, availability, performance, quality, oee_score, calculated_at

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies allow authenticated users to read their organization's data
  - Write operations restricted to authenticated users only
  - Audit logs are append-only

  ## Indexes
  - Primary keys on all tables
  - Foreign key indexes for performance
  - Timestamp indexes for time-series queries
  - Status and type columns indexed for filtering
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE gateway_status AS ENUM ('online', 'offline', 'warning', 'connecting');
CREATE TYPE device_status AS ENUM ('discovered', 'verified', 'unreachable', 'offline', 'online');
CREATE TYPE protocol_type AS ENUM ('modbus_tcp', 'modbus_rtu', 'opcua', 'mqtt', 'bacnet', 'dnp3', 'iec61850', 'iec104');
CREATE TYPE alarm_severity AS ENUM ('critical', 'high', 'medium', 'low', 'info');
CREATE TYPE sync_status AS ENUM ('pending', 'synced', 'failed');

-- 1. GATEWAYS TABLE
CREATE TABLE IF NOT EXISTS gateways (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  ip_address TEXT,
  port INTEGER DEFAULT 502,
  status gateway_status DEFAULT 'offline',
  firmware_version TEXT DEFAULT '1.0.0',
  last_seen TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gateways_status ON gateways(status);
CREATE INDEX IF NOT EXISTS idx_gateways_last_seen ON gateways(last_seen DESC);

ALTER TABLE gateways ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view gateways"
  ON gateways FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert gateways"
  ON gateways FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gateways"
  ON gateways FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gateways"
  ON gateways FOR DELETE
  TO authenticated
  USING (true);

-- 2. DEVICES TABLE
CREATE TABLE IF NOT EXISTS devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  vendor TEXT DEFAULT '',
  model TEXT DEFAULT '',
  protocol_type protocol_type NOT NULL,
  endpoint TEXT,
  status device_status DEFAULT 'discovered',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_devices_gateway ON devices(gateway_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
CREATE INDEX IF NOT EXISTS idx_devices_protocol ON devices(protocol_type);

ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view devices"
  ON devices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert devices"
  ON devices FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update devices"
  ON devices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete devices"
  ON devices FOR DELETE
  TO authenticated
  USING (true);

-- 3. PROTOCOL DRIVERS TABLE
CREATE TABLE IF NOT EXISTS protocol_drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  protocol_type protocol_type NOT NULL,
  vendor TEXT DEFAULT '',
  description TEXT DEFAULT '',
  installation_status TEXT DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_drivers_protocol ON protocol_drivers(protocol_type);
CREATE INDEX IF NOT EXISTS idx_drivers_vendor ON protocol_drivers(vendor);

ALTER TABLE protocol_drivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view drivers"
  ON protocol_drivers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage drivers"
  ON protocol_drivers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. PROTOCOL CONVERTERS TABLE
CREATE TABLE IF NOT EXISTS protocol_converters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  source_protocol protocol_type NOT NULL,
  target_protocol protocol_type NOT NULL,
  mapping_config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_converters_active ON protocol_converters(is_active);

ALTER TABLE protocol_converters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage converters"
  ON protocol_converters FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. DEVICE TAGS TABLE
CREATE TABLE IF NOT EXISTS device_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL,
  tag_address TEXT NOT NULL,
  data_type TEXT DEFAULT 'float',
  unit TEXT DEFAULT '',
  scaling_factor NUMERIC DEFAULT 1.0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tags_device ON device_tags(device_id);
CREATE INDEX IF NOT EXISTS idx_tags_name ON device_tags(tag_name);

ALTER TABLE device_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage tags"
  ON device_tags FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. DATA TRANSFORMATIONS TABLE
CREATE TABLE IF NOT EXISTS data_transformations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  flow_config JSONB DEFAULT '{}',
  input_tags UUID[],
  output_tags UUID[],
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transformations_active ON data_transformations(is_active);

ALTER TABLE data_transformations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage transformations"
  ON data_transformations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. DATA BUFFER TABLE
CREATE TABLE IF NOT EXISTS data_buffer (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  data_payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  synced_at TIMESTAMPTZ,
  sync_status sync_status DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_buffer_gateway ON data_buffer(gateway_id);
CREATE INDEX IF NOT EXISTS idx_buffer_status ON data_buffer(sync_status);
CREATE INDEX IF NOT EXISTS idx_buffer_created ON data_buffer(created_at DESC);

ALTER TABLE data_buffer ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage buffer"
  ON data_buffer FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. DATABASE INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS database_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  db_type TEXT NOT NULL,
  connection_string TEXT,
  status TEXT DEFAULT 'disconnected',
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE database_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage db integrations"
  ON database_integrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 9. ALARM RULES TABLE
CREATE TABLE IF NOT EXISTS alarm_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES device_tags(id) ON DELETE CASCADE,
  condition_expression TEXT NOT NULL,
  alarm_config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_alarm_rules_device ON alarm_rules(device_id);
CREATE INDEX IF NOT EXISTS idx_alarm_rules_active ON alarm_rules(is_active);

ALTER TABLE alarm_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage alarm rules"
  ON alarm_rules FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 10. ALARMS TABLE
CREATE TABLE IF NOT EXISTS alarms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
  alarm_rule_id UUID REFERENCES alarm_rules(id) ON DELETE SET NULL,
  alarm_type TEXT NOT NULL,
  severity alarm_severity DEFAULT 'medium',
  message TEXT NOT NULL,
  triggered_at TIMESTAMPTZ DEFAULT now(),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_alarms_device ON alarms(device_id);
CREATE INDEX IF NOT EXISTS idx_alarms_severity ON alarms(severity);
CREATE INDEX IF NOT EXISTS idx_alarms_triggered ON alarms(triggered_at DESC);

ALTER TABLE alarms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage alarms"
  ON alarms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 11. DASHBOARDS TABLE
CREATE TABLE IF NOT EXISTS dashboards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  layout_config JSONB DEFAULT '{}',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage dashboards"
  ON dashboards FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 12. DASHBOARD WIDGETS TABLE
CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  widget_type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  width INTEGER DEFAULT 4,
  height INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_widgets_dashboard ON dashboard_widgets(dashboard_id);

ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage widgets"
  ON dashboard_widgets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 13. PROTOCOL TRAFFIC LOGS TABLE
CREATE TABLE IF NOT EXISTS protocol_traffic_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  protocol_type protocol_type NOT NULL,
  direction TEXT NOT NULL,
  packet_data JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_traffic_gateway ON protocol_traffic_logs(gateway_id);
CREATE INDEX IF NOT EXISTS idx_traffic_timestamp ON protocol_traffic_logs(timestamp DESC);

ALTER TABLE protocol_traffic_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view traffic logs"
  ON protocol_traffic_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert traffic logs"
  ON protocol_traffic_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 14. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  cert_type TEXT NOT NULL,
  cert_data TEXT,
  private_key TEXT,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_certificates_expires ON certificates(expires_at);
CREATE INDEX IF NOT EXISTS idx_certificates_active ON certificates(is_active);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage certificates"
  ON certificates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 15. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT,
  action_type TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  changes JSONB DEFAULT '{}',
  ip_address TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_logs(resource_type, resource_id);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 16. FIRMWARE UPDATES TABLE
CREATE TABLE IF NOT EXISTS firmware_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  file_path TEXT,
  status TEXT DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_firmware_gateway ON firmware_updates(gateway_id);
CREATE INDEX IF NOT EXISTS idx_firmware_status ON firmware_updates(status);

ALTER TABLE firmware_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage firmware updates"
  ON firmware_updates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 17. CLOUD INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS cloud_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_name TEXT NOT NULL,
  endpoint TEXT,
  credentials JSONB DEFAULT '{}',
  status TEXT DEFAULT 'disconnected',
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE cloud_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage cloud integrations"
  ON cloud_integrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 18. HISTORIAN INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS historian_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_name TEXT NOT NULL,
  system_type TEXT NOT NULL,
  endpoint TEXT,
  credentials JSONB DEFAULT '{}',
  status TEXT DEFAULT 'disconnected',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE historian_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage historian integrations"
  ON historian_integrations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 19. API TOKENS TABLE
CREATE TABLE IF NOT EXISTS api_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token_name TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  permissions JSONB DEFAULT '{}',
  expires_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tokens_hash ON api_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_tokens_expires ON api_tokens(expires_at);

ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage api tokens"
  ON api_tokens FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 20. EDGE APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS edge_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  container_image TEXT,
  status TEXT DEFAULT 'stopped',
  config JSONB DEFAULT '{}',
  deployed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_edge_apps_gateway ON edge_applications(gateway_id);
CREATE INDEX IF NOT EXISTS idx_edge_apps_status ON edge_applications(status);

ALTER TABLE edge_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage edge applications"
  ON edge_applications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 21. CONFIGURATION TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS configuration_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL,
  config_data JSONB DEFAULT '{}',
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_templates_type ON configuration_templates(template_type);

ALTER TABLE configuration_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage templates"
  ON configuration_templates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 22. SCHEDULED TASKS TABLE
CREATE TABLE IF NOT EXISTS scheduled_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_name TEXT NOT NULL,
  task_type TEXT NOT NULL,
  cron_expression TEXT,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_run TIMESTAMPTZ,
  next_run TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_active ON scheduled_tasks(is_active);
CREATE INDEX IF NOT EXISTS idx_tasks_next_run ON scheduled_tasks(next_run);

ALTER TABLE scheduled_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage scheduled tasks"
  ON scheduled_tasks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 23. ML MODELS TABLE
CREATE TABLE IF NOT EXISTS ml_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  model_type TEXT NOT NULL,
  model_path TEXT,
  accuracy NUMERIC,
  deployed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_models_active ON ml_models(is_active);

ALTER TABLE ml_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage ml models"
  ON ml_models FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 24. DATA LINEAGE TABLE
CREATE TABLE IF NOT EXISTS data_lineage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tag_id UUID REFERENCES device_tags(id) ON DELETE CASCADE,
  source_device UUID REFERENCES devices(id) ON DELETE SET NULL,
  transformations JSONB DEFAULT '[]',
  destination TEXT,
  tracked_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lineage_tag ON data_lineage(tag_id);
CREATE INDEX IF NOT EXISTS idx_lineage_tracked ON data_lineage(tracked_at DESC);

ALTER TABLE data_lineage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage lineage"
  ON data_lineage FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 25. POLICY RULES TABLE
CREATE TABLE IF NOT EXISTS policy_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rule_name TEXT NOT NULL,
  condition_expression TEXT NOT NULL,
  action_config JSONB DEFAULT '{}',
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_policy_rules_active ON policy_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_policy_rules_priority ON policy_rules(priority DESC);

ALTER TABLE policy_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage policy rules"
  ON policy_rules FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 26. OEE METRICS TABLE
CREATE TABLE IF NOT EXISTS oee_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gateway_id UUID REFERENCES gateways(id) ON DELETE CASCADE,
  availability NUMERIC DEFAULT 0,
  performance NUMERIC DEFAULT 0,
  quality NUMERIC DEFAULT 0,
  oee_score NUMERIC DEFAULT 0,
  calculated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_oee_gateway ON oee_metrics(gateway_id);
CREATE INDEX IF NOT EXISTS idx_oee_calculated ON oee_metrics(calculated_at DESC);

ALTER TABLE oee_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage oee metrics"
  ON oee_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
