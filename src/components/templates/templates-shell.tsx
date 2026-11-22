"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DocumentThumbnail } from "@/components/shared/document-thumbnail";
import { ShellButton } from "@/components/shared/form-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusPanel } from "@/components/shared/status-panel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatMessage } from "@/lib/i18n/format.ts";
import { useMessages } from "@/lib/i18n/messages-provider.tsx";
import type { TemplateListItem } from "@/lib/templates";

type TemplatesShellProps = {
  initialState?: "error";
  templates?: readonly TemplateListItem[];
};

export function TemplatesShell({
  initialState,
  templates = [],
}: TemplatesShellProps) {
  const copy = useMessages().messages.templates;
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<TemplateListItem | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!pendingDelete || isDeleting) {
      return;
    }

    setDeleteError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/templates/${pendingDelete.id}`, {
        method: "DELETE",
      });

      // Already gone is as good as deleted.
      if (!response.ok && response.status !== 404) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;

        setDeleteError(payload?.error ?? copy.delete.error);
        return;
      }

      setPendingDelete(null);
      router.refresh();
    } catch {
      setDeleteError(copy.delete.error);
    } finally {
      setIsDeleting(false);
    }
  }

  if (initialState === "error") {
    return (
      <div className="space-y-5">
        <PageHeader
          description={copy.header.description}
          title={copy.header.title}
        />
        <StatusPanel
          action={{ href: "/templates", label: copy.error.retry }}
          description={copy.error.description}
          title={copy.error.title}
          tone="error"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        description={copy.header.description}
        title={copy.header.title}
      />

      {templates.length === 0 ? (
        <section
          className="panel px-6 py-14 sm:py-16"
          data-animate="enter"
          data-animate-delay="1"
        >
          <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
            <span className="flex h-28 items-center justify-center">
              <DocumentThumbnail title="" />
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-(--fg)">
                {copy.empty.title}
              </h2>
              <p className="text-[0.9375rem] leading-6 text-(--secondary)">
                {copy.empty.description}
              </p>
            </div>
            <ShellButton href="/dashboard">{copy.empty.action}</ShellButton>
          </div>
        </section>
      ) : (
        <section
          className="panel p-5 sm:p-7"
          data-animate="enter"
          data-animate-delay="1"
        >
          <ul className="space-y-3">
            {templates.map((template) => (
              <li
                className="well flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                key={template.id}
              >
                <div className="min-w-0 space-y-2">
                  <h2 className="truncate text-[1.0625rem] font-extrabold text-(--fg)">
                    {template.name}
                  </h2>
                  <p className="text-sm leading-6 text-(--secondary)">
                    {formatMessage(copy.card.meta, {
                      fieldCount: template.fieldCountLabel,
                      pageCount: template.pageCountLabel,
                      saved: formatMessage(copy.card.saved, {
                        date: template.createdAtLabel,
                      }),
                    })}
                  </p>
                  <ul
                    aria-label={formatMessage(copy.card.roleAriaLabel, {
                      templateName: template.name,
                    })}
                    className="flex flex-wrap gap-2"
                  >
                    {template.roleNames.map((roleName, index) => (
                      <li
                        className="pill pill-neutral"
                        key={`${String(index)}-${roleName}`}
                      >
                        {formatMessage(copy.card.roleItem, {
                          index: index + 1,
                          name: roleName,
                        })}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    aria-label={formatMessage(copy.delete.triggerAriaLabel, {
                      templateName: template.name,
                    })}
                    className="btn-quiet btn-quiet-danger min-h-11 px-4"
                    onClick={() => {
                      setDeleteError(null);
                      setPendingDelete(template);
                    }}
                    type="button"
                  >
                    {copy.delete.triggerLabel}
                  </button>
                  <ShellButton
                    className="min-h-11"
                    href={`/templates/${template.id}/send-many`}
                    variant="secondary"
                  >
                    {copy.sendToMany}
                  </ShellButton>
                  <ShellButton
                    className="min-h-11"
                    href={`/templates/${template.id}/use`}
                  >
                    {copy.use}
                  </ShellButton>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {pendingDelete ? (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open && !isDeleting) {
              setPendingDelete(null);
            }
          }}
        >
          <DialogContent className="max-w-md sm:p-8" showCloseButton={false}>
            <div className="space-y-4">
              <DialogHeader className="space-y-3">
                <DialogTitle>{copy.delete.title}</DialogTitle>
                <DialogDescription asChild>
                  <div className="space-y-2 text-sm leading-6 text-(--secondary)">
                    <p>
                      {formatMessage(copy.delete.description.removed, {
                        templateName: pendingDelete.name,
                      })}
                    </p>
                    <p>{copy.delete.description.retained}</p>
                  </div>
                </DialogDescription>
              </DialogHeader>

              {deleteError ? (
                <div className="notice notice-danger" role="alert">
                  <p>{deleteError}</p>
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <ShellButton
                  disabled={isDeleting}
                  onClick={() => setPendingDelete(null)}
                  variant="secondary"
                >
                  {copy.delete.cancel}
                </ShellButton>
                <ShellButton
                  loading={isDeleting}
                  onClick={handleConfirmDelete}
                  variant="danger"
                >
                  {isDeleting ? copy.delete.deleting : copy.delete.confirm}
                </ShellButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
