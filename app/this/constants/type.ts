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
    id: number;
    name: string;
    avatar: string;
    language: string;
    phone: string;
    type: string; // Sales, Secretary, Customer Service, Institutional, Real Estate, Feedback Collection, Custom
    totalCallTime: number;
    completedLeads: number;
    incomingCalls: number;
    outgoingCalls: number;
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
    id: string;
    time: string;
    duration: number; // in seconds
    callType: string; // Inbound, Outbound, Internal
    cost: number; // in USD
    agent: Agent; // agent id
    lead: Lead; // lead id
    from: string; // phone number
    to: string; // phone number
    callResult: string; // Success, Failed, No Answer, Busy, Voicemail, Other
    callStatus: string; // Completed, Missed, Abandoned, Voicemail, Busy, No Answer, Answered, Rejected, Failed, Cancelled, Other
    callNotes: string; // notes of the call
    transcription: string; // transcription of the call
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