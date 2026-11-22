import { expect, test } from "@playwright/test";

// No signing flow here: the public Verify page is enough to show that a
// browser's language reaches the server, sets the locale cookie and survives
// a later request. Signing URLs themselves stay exactly as they were.
test("Accept-Language picks Indonesian and the cookie keeps it", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "id-ID" });
  const page = await context.newPage();

  await page.goto("/verify");

  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Verifikasi dokumen",
  );
  await expect(
    page.getByText("Periksa bahwa PDF yang telah ditandatangani"),
  ).toBeVisible();

  const cookies = await context.cookies();
  expect(cookies.find((cookie) => cookie.name === "NEXT_LOCALE")?.value).toBe(
    "id",
  );

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");

  await context.close();
});

test("English remains the default", async ({ browser }) => {
  const context = await browser.newContext({ locale: "fr-FR" });
  const page = await context.newPage();

  await page.goto("/verify");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Verify a document",
  );

  await context.close();
});

test("the footer switcher changes the language without changing the URL", async ({
  context,
  page,
}) => {
  await page.goto("/verify");

  const originalUrl = page.url();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const flag = page.getByTestId("locale-flag").locator("svg");
  const englishFlagBox = await flag.boundingBox();
  expect(englishFlagBox?.width).toBe(18);
  expect(englishFlagBox?.height).toBe(18);

  await page.getByLabel("Choose a language").selectOption("id");

  const indonesianFlagBox = await flag.boundingBox();
  expect(indonesianFlagBox?.width).toBe(18);
  expect(indonesianFlagBox?.height).toBe(18);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Verifikasi dokumen",
  );
  expect(page.url()).toBe(originalUrl);
  expect(
    (await context.cookies()).find((cookie) => cookie.name === "NEXT_LOCALE")
      ?.value,
  ).toBe("id");

  // The Indonesian name is the longest option: keep it readable on a phone.
  await page.setViewportSize({ width: 375, height: 812 });
  const selectBox = await page.locator("select[aria-label]").boundingBox();
  expect(selectBox?.width).toBeGreaterThanOrEqual(160);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(375);
});

test("the permitted-use page follows the locale without changing its URL", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "id-ID" });
  const page = await context.newPage();

  await page.goto("/electronic-signatures");

  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Untuk apa ini",
  );
  await expect(
    page.getByRole("heading", { level: 2, name: "Apa itu Sakta" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Di Indonesia" }),
  ).toBeVisible();
  expect(page.url()).toContain("/electronic-signatures");

  await context.close();
});

test("the settings route keeps its URL under Indonesian", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "id-ID" });
  const page = await context.newPage();

  await page.goto("/settings");

  // Anonymous visitors go to sign-in or setup, never to an /id/... variant.
  await expect(page).toHaveURL(/\/login$|\/setup$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  expect(page.url()).not.toContain("/id/");
  expect(
    (await context.cookies()).find((cookie) => cookie.name === "NEXT_LOCALE")
      ?.value,
  ).toBe("id");

  await context.close();
});
