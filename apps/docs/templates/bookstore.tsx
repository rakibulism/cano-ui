"use client"
import * as React from "react"
import {
  BookOpen,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  RefreshCw,
  Gift,
  Menu,
  Mail,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Genre = "All" | "Fiction" | "Nonfiction" | "Sci-Fi" | "Kids"

const GENRES: Genre[] = ["All", "Fiction", "Nonfiction", "Sci-Fi", "Kids"]

type Book = {
  id: number
  title: string
  author: string
  genre: Exclude<Genre, "All">
  price: number
  rating: number
  tag?: string
}

const BOOKS: Book[] = [
  { id: 1, title: "The Lantern Keeper", author: "Mara Wren", genre: "Fiction", price: 18.0, rating: 4.8, tag: "Bestseller" },
  { id: 2, title: "Quiet Tides", author: "Elias Hart", genre: "Fiction", price: 15.5, rating: 4.5 },
  { id: 3, title: "Atoms of Habit", author: "Dr. Nina Cole", genre: "Nonfiction", price: 22.0, rating: 4.9, tag: "Staff Pick" },
  { id: 4, title: "Building Calm", author: "Theo Marsh", genre: "Nonfiction", price: 19.0, rating: 4.3 },
  { id: 5, title: "Orbit of Echoes", author: "Vera Lin", genre: "Sci-Fi", price: 16.5, rating: 4.7, tag: "New" },
  { id: 6, title: "The Last Signal", author: "Kade Rourke", genre: "Sci-Fi", price: 17.0, rating: 4.4 },
  { id: 7, title: "Luna's Garden", author: "Posy Bell", genre: "Kids", price: 12.0, rating: 4.9 },
  { id: 8, title: "Dragons Don't Nap", author: "Sam Otter", genre: "Kids", price: 11.5, rating: 4.6, tag: "New" },
  { id: 9, title: "Paper Cities", author: "Iris Vale", genre: "Fiction", price: 20.0, rating: 4.2 },
]

const STAFF_PICKS: Book[] = [BOOKS[2], BOOKS[4], BOOKS[0], BOOKS[6]]

const PERKS = [
  { icon: Truck, title: "Free shipping over $35", desc: "Cozy reads delivered to your door." },
  { icon: RefreshCw, title: "30-day returns", desc: "Not the right page-turner? Send it back." },
  { icon: Gift, title: "Gift wrapping", desc: "Every order can arrive ready to give." },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
      {rating.toFixed(1)}
    </span>
  )
}

export default function BookstoreTemplate() {
  const [activeGenre, setActiveGenre] = React.useState<Genre>("All")
  const [cartCount, setCartCount] = React.useState(0)

  const visibleBooks =
    activeGenre === "All"
      ? BOOKS
      : BOOKS.filter((b) => b.genre === activeGenre)

  const addToCart = () => setCartCount((c) => c + 1)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg tracking-tight">Marginalia</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#shop" className="transition-colors hover:text-foreground">Shop</a>
            <a href="#staff" className="transition-colors hover:text-foreground">Staff Picks</a>
            <a href="#" className="transition-colors hover:text-foreground">Events</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search titles, authors..."
                className="w-44 pl-9 lg:w-60"
                aria-label="Search the catalog"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="size-5" />
            </Button>
            <Button variant="outline" size="sm" className="relative gap-2">
              <ShoppingCart className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <Badge
                variant="default"
                className="ml-0.5 h-5 min-w-5 justify-center rounded-full px-1.5 tabular-nums"
              >
                {cartCount}
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
                Book of the Month
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The Lantern Keeper
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">by Mara Wren</p>
              <p className="mt-5 max-w-md text-muted-foreground">
                A luminous novel about a lighthouse, a lost letter, and the
                long way home. Hand-picked by our booksellers and loved by
                readers everywhere.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Stars rating={4.8} />
                <Separator orientation="vertical" className="h-5" />
                <span className="text-2xl font-semibold">$18.00</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2" onClick={addToCart}>
                  <ShoppingCart className="size-4" aria-hidden="true" />
                  Add to cart
                </Button>
                <Button size="lg" variant="outline">
                  Read an excerpt
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-2xl border bg-card p-8 shadow-sm">
                <div className="flex h-full w-full flex-col justify-between rounded-xl bg-primary/10 p-6 text-primary">
                  <Quote className="size-8" aria-hidden="true" />
                  <div>
                    <p className="text-xl font-semibold leading-snug text-foreground">
                      The Lantern Keeper
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Mara Wren</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
            {PERKS.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-foreground">
                  <perk.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">{perk.title}</p>
                  <p className="text-sm text-muted-foreground">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Browse the shelves</h2>
              <p className="mt-1 text-muted-foreground">
                {visibleBooks.length} {visibleBooks.length === 1 ? "title" : "titles"} in {activeGenre.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const active = genre === activeGenre
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setActiveGenre(genre)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {visibleBooks.map((book) => (
              <Card key={book.id} className="group overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative flex aspect-[3/4] items-center justify-center rounded-lg bg-muted p-4 text-center">
                    {book.tag ? (
                      <Badge variant="secondary" className="absolute left-2 top-2">
                        {book.tag}
                      </Badge>
                    ) : null}
                    <span className="text-sm font-medium leading-snug text-muted-foreground">
                      {book.title}
                    </span>
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="line-clamp-1 font-medium">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="flex items-center justify-between pt-1">
                      <Stars rating={book.rating} />
                      <Badge variant="outline" className="font-normal">
                        {book.genre}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-2 px-4 pb-4 pt-0">
                  <span className="text-lg font-semibold tabular-nums">
                    ${book.price.toFixed(2)}
                  </span>
                  <Button size="sm" className="gap-1.5" onClick={addToCart}>
                    <ShoppingCart className="size-4" aria-hidden="true" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="staff" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <div className="flex items-center gap-2">
              <Heart className="size-5 fill-primary text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-tight">From our booksellers</h2>
            </div>
            <p className="mt-1 text-muted-foreground">
              Titles our staff couldn't stop talking about this season.
            </p>
            <div className="mt-8 flex gap-5 overflow-x-auto pb-2">
              {STAFF_PICKS.map((book) => (
                <div
                  key={book.id}
                  className="flex w-56 shrink-0 flex-col rounded-xl border bg-card p-4"
                >
                  <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-primary/10 p-4 text-center text-sm font-medium text-primary">
                    {book.title}
                  </div>
                  <p className="mt-3 line-clamp-1 font-medium">{book.title}</p>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-semibold tabular-nums">${book.price.toFixed(2)}</span>
                    <Button size="sm" variant="outline" onClick={addToCart}>
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-center gap-5 rounded-2xl border bg-card px-6 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Join the reading list</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Monthly recommendations, author events, and a 10% welcome
                discount on your first order.
              </p>
            </div>
            <form
              className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="size-4" aria-hidden="true" />
              </span>
              Marginalia
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              An independent bookshop for curious readers. Open daily, 9 to 9.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">New arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Bestsellers</a></li>
              <li><a href="#" className="hover:text-foreground">Gift cards</a></li>
              <li><a href="#" className="hover:text-foreground">Pre-orders</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Visit</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Store events</a></li>
              <li><a href="#" className="hover:text-foreground">Book clubs</a></li>
              <li><a href="#" className="hover:text-foreground">Our story</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Help</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:px-6">
            <p>2026 Marginalia Books. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
