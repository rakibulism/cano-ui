import { Button } from "@/components/ui/button"
import { ErrorPage } from "@/registry/ui/error-page"

export default function ErrorPageDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <ErrorPage
        code={404}
        title="Page not found"
        description="The page you are looking for doesn't exist or has been moved. Check the URL or head back to your dashboard."
        actions={
          <>
            <Button asChild>
              <a href="/">Go home</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="mailto:support@acme.com">Contact support</a>
            </Button>
          </>
        }
      />
    </div>
  )
}
