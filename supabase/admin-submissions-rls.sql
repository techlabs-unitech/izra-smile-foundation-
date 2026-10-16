-- Replace the UUID below with the existing administrator's Auth user ID before running.
-- This script leaves INSERT available to public website visitors but restricts reads.

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_intents ENABLE ROW LEVEL SECURITY;

REVOKE SELECT ON TABLE
  public.contact_submissions,
  public.volunteer_applications,
  public.donation_intents
FROM PUBLIC, anon, authenticated;

GRANT INSERT ON TABLE
  public.contact_submissions,
  public.volunteer_applications,
  public.donation_intents
TO anon, authenticated;

GRANT SELECT ON TABLE
  public.contact_submissions,
  public.volunteer_applications,
  public.donation_intents
TO authenticated;

DO $$
DECLARE
  target_table text;
  existing_policy record;
BEGIN
  FOREACH target_table IN ARRAY ARRAY[
    'contact_submissions',
    'volunteer_applications',
    'donation_intents'
  ] LOOP
    FOR existing_policy IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public' AND tablename = target_table
    LOOP
      EXECUTE format('DROP POLICY %I ON public.%I', existing_policy.policyname, target_table);
    END LOOP;
  END LOOP;
END
$$;

CREATE POLICY "public submission insert"
  ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "authorized admin read"
  ON public.contact_submissions
  FOR SELECT TO authenticated
USING (auth.uid() = '15ebd081-91f6-470b-97e6-a7ae9d4010d2'::uuid);CREATE POLICY "public submission insert"
  ON public.volunteer_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "authorized admin read"
  ON public.volunteer_applications
  FOR SELECT TO authenticated
USING (auth.uid() = '15ebd081-91f6-470b-97e6-a7ae9d4010d2'::uuid);CREATE POLICY "public submission insert"
  ON public.donation_intents
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "authorized admin read"
  ON public.donation_intents
  FOR SELECT TO authenticated
USING (auth.uid() = '15ebd081-91f6-470b-97e6-a7ae9d4010d2'::uuid);