import { TemplatesShell } from "@/components/templates/templates-shell";
import { getAuthSession } from "@/lib/auth/server";
import { getDb } from "@/lib/db/connection";
import { getRequestLocale } from "@/lib/i18n/request.ts";
import { listTemplatesForUser } from "@/lib/templates";

export default async function TemplatesPage() {
  let templates: Awaited<ReturnType<typeof listTemplatesForUser>> = [];
  let initialState: "error" | undefined;

  try {
    const [session, locale] = await Promise.all([
      getAuthSession(),
      getRequestLocale(),
    ]);

    templates = session
      ? await listTemplatesForUser(session.user.id, getDb(), locale)
      : [];
  } catch {
    initialState = "error";
  }

  return <TemplatesShell initialState={initialState} templates={templates} />;
}
