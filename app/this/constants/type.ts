import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type Response = {
    status: number;
    message: string;
    data: any;
}

export type SortingState = {
    field: string;
    desc: boolean;
}

export type Agent = {
    agent_id: string;
    last_modification_timestamp: number;
    phone_number: {
        inbound_number: string;
        outbound_number: string;
    };
    voice_id: string;
    voice_model: string;
    voice_temperature: number;
    voice_speed: number;
    volume: number;
    enable_backchannel: boolean;
    backchannel_words: string[];
    interruption_sensitivity: number;
    ambient_sound: string;
    ambient_sound_volume: number;
    agent_name: string;
    response_engine: {
        type: string;
        llm_id: string;
    };
    llm_websocket_url: string;
    responsiveness: number;
    language: string;
    opt_out_sensitive_data_storage: boolean;
    normalize_for_speech: boolean;
    end_call_after_silence_ms: number;
    enable_voicemail_detection: boolean;
    voicemail_message: string;
    max_call_duration_ms: number;
    voicemail_detection_timeout_ms: number;
    begin_message_delay_ms: number;
}

export type AgentType =
  | 'Sales'
  | 'Secretary'
  | 'Customer Service'
  | 'Institutional'
  | 'Real Estate'
  | 'Feedback Collection'
  | 'Custom'

export type Lead = {
    id: string;
    groupId: string;
    name: string;
    phone: string;
    email: string;
    metadata: any;
    createdAt: string;
}

export type LeadGroup = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export type LeadStatus =
  | 'Marketing Qualified Lead (MQL)'
  | 'Sales Qualified Lead (SQL)'
  | 'Product Qualified Lead (PQL)'
  | 'Service Qualified Lead'
  | 'Cold Lead'
  | 'Warm Lead'
  | 'Hot Lead'
  | 'Referral Lead'
  | 'Inbound Lead'
  | 'Outbound Lead'
  | 'Churned Lead'

export type TeamMember = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: string; // Pending, Active, Inactive
    employedAt: string;
}

export type Call = {
    call_id: string;
    agent_id: string;
    call_status: string;
    start_timestamp: number;
    end_timestamp: number;
    duration_ms: number;
    public_log_url: string;
    recording_url: string;
    disconnection_reason: string;
    latency: Record<string, any>;
    cost_metadata: {
        telecommunication: string;
        llm_model: string;
        voice_provider: string;
    };
    call_cost: {
        total_duration_unit_price: number;
        product_costs: any[];
        total_one_time_price: number;
        combined_cost: number;
        total_duration_seconds: number;
    };
    call_analysis: {
        custom_analysis_data: Record<string, any>;
        agent_task_completion_rating: string;
        call_successful: boolean;
        in_voicemail: boolean;
        call_summary: string;
        user_sentiment: string;
        call_completion_rating: string;
    };
    opt_out_sensitive_data_storage: boolean;
    call_type: string;
    from_number: string;
    to_number: string;
    direction: 'inbound' | 'outbound';
}


export type Knowledge = {
    id: string;
    name: string;
    description: string;
    type: string; // PDF, AUDIO, VIDEO, TEXT
    url: string;
    size: number; // in bytes
    createdAt: string;
}