import { test, expect } from "@playwright/test";
import { createBlog, loginIn } from "./helper";

const USER_CRED = "test";
const WRONG_USER_CRED = "wrong";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: USER_CRED,
        name: USER_CRED,
        password: USER_CRED,
      },
    });

    await page.goto("/");
  });
  test("login form is shown", async ({ page }) => {
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });
  test.describe("login", async () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginIn(page, USER_CRED, USER_CRED);

      await expect(page.getByText("test logged in")).toBeVisible();
      await expect(page.getByRole("button", { name: "Log Out" })).toBeVisible();
    });

    test("failed with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill(WRONG_USER_CRED);
      await page.getByLabel("password").fill(WRONG_USER_CRED);
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("test logged in")).not.toBeVisible();
    });
  });
  test.describe("when logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginIn(page, USER_CRED, USER_CRED);
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url");
      await page.locator("div.blog").waitFor();
      await expect(page.getByText("More info")).toBeVisible();
    });
    test("a blog post can be liked", async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url");
      await page.locator("div.blog").waitFor();
      await page.getByText("More info").click();

      const likeButton = page.getByRole("button", { name: "like" });
      await expect(likeButton).toBeVisible();
      await likeButton.click();

      await expect(page.locator("p.blog-like")).toHaveText("Likes: 1");
    });
    test("user who added the blog can delete it", async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url");
      await page.locator("div.blog").waitFor();
      await page.getByText("More info").click();

      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "remove" }).click();
      page.on("dialog", (dialog) => dialog.accept());

      await expect(page.getByText("More info")).not.toBeVisible();
    });
    test("only user who added blog can see delate button", async ({ page }) => {
      await createBlog(page, "test title", "test author", "test url");
      await page.locator("div.blog").waitFor();
      const user = await page.evaluate(() => window.localStorage);
      const logInUser = JSON.parse(user.loggedBlogUser).username;

      await page.getByText("More info").click();

      expect(USER_CRED).toBe(logInUser);
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();
    });
    test("blogs are ordered according to likes (most likes first)", async ({
      page,
    }) => {
      const blogs = [
        { title: "First Blog", author: "Author1", url: "http://blog1.com" },
        { title: "Second Blog", author: "Author2", url: "http://blog2.com" },
        { title: "Third Blog", author: "Author3", url: "http://blog3.com" },
      ];

      for (const blog of blogs) {
        await createBlog(page, blog.title, blog.author, blog.url);
      }

      async function likeBlog(title, likeCount) {
        const blogElement = page.locator(`div.blog:has-text("${title}")`);

        const detailsContent = blogElement.locator(".details-content");
        if (!(await detailsContent.isVisible())) {
          await blogElement.locator(".toggle-summary").click();
          await page.waitForTimeout(200);
        }

        for (let i = 0; i < likeCount; i++) {
          await blogElement.getByRole("button", { name: "like" }).click();
          await page.waitForTimeout(500);
        }
      }

      await likeBlog("Second Blog", 5);
      await likeBlog("First Blog", 3);
      await likeBlog("Third Blog", 1);

      const blogTitles = await page
        .locator("span.blog-title")
        .allTextContents();

      expect(blogTitles).toEqual(["Second Blog", "First Blog", "Third Blog"]);
    });
  });
});
