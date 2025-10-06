export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type GatewayStatus = 'online' | 'offline' | 'warning' | 'connecting';
export type DeviceStatus = 'discovered' | 'verified' | 'unreachable' | 'offline' | 'online';
export type ProtocolType = 'modbus_tcp' | 'modbus_rtu' | 'opcua' | 'mqtt' | 'bacnet' | 'dnp3' | 'iec61850' | 'iec104';
export type AlarmSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type SyncStatus = 'pending' | 'synced' | 'failed';

export interface Database {
  public: {
    Tables: {
      gateways: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          ip_address: string | null;
          port: number | null;
          status: GatewayStatus;
          firmware_version: string | null;
          last_seen: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['gateways']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['gateways']['Insert']>;
      };
      devices: {
        Row: {
          id: string;
          gateway_id: string | null;
          name: string;
          vendor: string | null;
          model: string | null;
          protocol_type: ProtocolType;
          endpoint: string | null;
          status: DeviceStatus;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['devices']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['devices']['Insert']>;
      };
      protocol_drivers: {
        Row: {
          id: string;
          name: string;
          version: string;
          protocol_type: ProtocolType;
          vendor: string | null;
          description: string | null;
          installation_status: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['protocol_drivers']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['protocol_drivers']['Insert']>;
      };
      device_tags: {
        Row: {
          id: string;
          device_id: string | null;
          tag_name: string;
          tag_address: string;
          data_type: string | null;
          unit: string | null;
          scaling_factor: number | null;
          metadata: Json;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['device_tags']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['device_tags']['Insert']>;
      };
      alarms: {
        Row: {
          id: string;
          device_id: string | null;
          alarm_rule_id: string | null;
          alarm_type: string;
          severity: AlarmSeverity;
          message: string;
          triggered_at: string;
          acknowledged_at: string | null;
          resolved_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['alarms']['Row'], 'id' | 'triggered_at'> & {
          id?: string;
          triggered_at?: string;
        };
        Update: Partial<Database['public']['Tables']['alarms']['Insert']>;
      };
      dashboards: {
        Row: {
          id: string;
          name: string;
          layout_config: Json;
          is_default: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['dashboards']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['dashboards']['Insert']>;
      };
      oee_metrics: {
        Row: {
          id: string;
          gateway_id: string | null;
          availability: number | null;
          performance: number | null;
          quality: number | null;
          oee_score: number | null;
          calculated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['oee_metrics']['Row'], 'id' | 'calculated_at'> & {
          id?: string;
          calculated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['oee_metrics']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gateway_status: GatewayStatus;
      device_status: DeviceStatus;
      protocol_type: ProtocolType;
      alarm_severity: AlarmSeverity;
      sync_status: SyncStatus;
    };
  };
}
