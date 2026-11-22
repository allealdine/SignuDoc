-- Each recipient keeps the language chosen when the envelope was sent. The
-- invitation, later signing steps and the signing page then agree on one
-- language even if a signer opens the link in a different browser. Existing
-- recipients stay in English, which is what every stored invitation said.

alter table public.signers
  add column if not exists locale text not null default 'en';

alter table public.signers
  drop constraint if exists signers_locale_check;

alter table public.signers
  add constraint signers_locale_check check (locale in ('en', 'id'));
