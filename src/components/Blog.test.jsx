import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import blogService from "../services/blogs"
import { render, screen } from "@testing-library/react"
import { expect, vi } from "vitest"

vi.mock("../services/blogs")

describe("<Blog />", () => {
  test("renders with blog title and author", () => {
    const blog = {
      title: "Test Blog Title",
      author: "Test Author",
      url: null,
      likes: null,
      users: null,
      id: 1,
    }

    const setBlogs = vi.fn()
    render(<Blog blog={blog} setBlogs={setBlogs} user={null} />)

    expect(screen.getByText("Test Blog Title")).toBeInTheDocument()
    expect(screen.getByText("by Test Author")).toBeInTheDocument()

    expect(screen.queryByText("http://example.com")).not.toBeInTheDocument()
    expect(screen.queryByText("Likes: 10")).not.toBeInTheDocument()
  })

  test("blog url and number of like are shown when summary button is clicked", async () => {
    const user = userEvent.setup()
    const blog = {
      title: "Test Blog Title",
      author: "Test Author",
      url: "http://example.com",
      users: null,
      likes: 5,
      id: 1,
    }

    const setBlogs = vi.fn()
    render(<Blog blog={blog} setBlogs={setBlogs} user={null} />)
    const showBtn = screen.getByText("More Info")
    const likes = screen.getByText("Likes: 5", { exact: false })
    const details = screen.getByRole("group")
    const url = screen.getByText("http://example.com", { exact: false })

    expect(showBtn).toBeInTheDocument()
    expect(details).not.toHaveAttribute("open")

    await user.click(showBtn)

    expect(details).toHaveAttribute("open")
    expect(likes).toBeVisible()
    expect(url).toBeVisible()
  })

  test("like button works", async () => {
    const blog = {
      title: "Test Blog Title",
      author: "Test Author",
      url: "http://example.com",
      users: null,
      likes: 5,
      id: 1,
    }
    const setBlogs = vi.fn()
    let likes = 0
    const spyOnUpdate = vi
      .spyOn(blogService, "update")
      .mockImplementation(() => likes)

    render(<Blog blog={blog} setBlogs={setBlogs} user={null} />)

    const showBtn = screen.getByText("More Info")
    userEvent.click(showBtn)

    const likeBtn = screen.getByText("like")
    await userEvent.click(likeBtn)
    await userEvent.click(likeBtn)
    likes = 2

    expect(blogService.update()).toBe(2)
    expect(spyOnUpdate).toHaveBeenCalledTimes(3)
  })
  test("successfully creates new blog with right details ", async () => {
    const mockSetBlogs = vi.fn()
    const mockSetNotification = vi.fn()

    blogService.create.mockResolvedValue({
      title: "testing title input",
      author: "testing author input",
      url: "testing url input",
      id: "123",
    })
    blogService.getAll.mockResolvedValue([
      {
        title: "testing title input",
        author: "testing author input",
        url: "testing url input",
        id: "123",
      },
    ])

    render(
      <CreateBlog
        setBlogs={mockSetBlogs}
        setNotification={mockSetNotification}
      />
    )

    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText("enter blog title")
    const authorInput = screen.getByPlaceholderText("enter blog author")
    const urlInput = screen.getByPlaceholderText("enter blog url")
    const sendBtn = screen.getByRole("button", { name: /create/i })

    await user.type(titleInput, "testing title input")
    await user.type(authorInput, "testing author input")
    await user.type(urlInput, "testing url input")
    await user.click(sendBtn)

    expect(blogService.create).toHaveBeenCalledWith({
      title: "testing title input",
      author: "testing author input",
      url: "testing url input",
    })
    expect(mockSetBlogs).toHaveBeenCalled()
    expect(mockSetNotification).toHaveBeenCalledWith({
      message: "a new blog testing title input by testing author input",
      type: "success",
    })

    expect(titleInput.value).toBe("")
    expect(authorInput.value).toBe("")
    expect(urlInput.value).toBe("")
  })
})
