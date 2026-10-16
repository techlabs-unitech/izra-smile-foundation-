import { createClient } from "@supabase/supabase-js";

type GeneratedColumns = {
  id?: never;
  created_at?: never;
  status?: never;
};

type TableDefinition<Row, Insert> = {
  Row: Row & { id: string; status: string; created_at: string };
  Insert: Insert & GeneratedColumns;
  Update: Partial<Insert>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      contact_submissions: TableDefinition<
        {
          full_name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
        },
        {
          full_name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
        }
      >;
      volunteer_applications: TableDefinition<
        {
          full_name: string;
          email: string;
          phone: string | null;
          city: string;
          help_type: string;
          areas_of_interest: string[];
          message: string | null;
        },
        {
          full_name: string;
          email: string;
          phone: string | null;
          city: string;
          help_type: string;
          areas_of_interest: string[];
          message: string | null;
        }
      >;
      donation_intents: TableDefinition<
        {
          full_name: string;
          email: string;
          phone: string | null;
          amount: number;
          purpose: string;
          message: string | null;
        },
        {
          full_name: string;
          email: string;
          phone: string | null;
          amount: number;
          purpose: string;
          message: string | null;
        }
      >;
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);