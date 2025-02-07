import { expect } from "@playwright/test";
async function loginIn(page, username, password) {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
}

async function createBlog(page, title, author, url) {
  await expect(page.getByRole("button", { name: "new note" })).toBeVisible();
  await page.getByRole("button", { name: "new note" }).click();

  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);

  await page.getByRole("button", { name: "create" }).click();

  await page.getByRole("button", { name: "cancel" }).click();
  await page.locator(`div.blog:has-text("${title}")`).waitFor();
}

export { loginIn, createBlog };
