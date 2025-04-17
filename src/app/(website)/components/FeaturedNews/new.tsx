<section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
          In The News
        </div>
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Featured In
        </h2>
        <p className="max-w-[700px] text-muted-foreground md:text-lg">
          GYBWP has been recognized by leading publications and media outlets.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
      <div className="grid gap-6">
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              width={80}
              height={80}
              alt="Forbes Logo"
              className="rounded-md object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold">Forbes</h3>
              <p className="text-sm text-muted-foreground">
                "One of the most insightful business podcasts for purpose-driven
                entrepreneurs."
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
              >
                <span>Read Article</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              width={80}
              height={80}
              alt="Entrepreneur Logo"
              className="rounded-md object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold">Entrepreneur</h3>
              <p className="text-sm text-muted-foreground">
                "GYBWP offers practical advice that balances profit with purpose
                in a refreshing way."
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
              >
                <span>Read Article</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              width={80}
              height={80}
              alt="Fast Company Logo"
              className="rounded-md object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold">Fast Company</h3>
              <p className="text-sm text-muted-foreground">
                "A must-listen for entrepreneurs who want to make an impact
                while building successful businesses."
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
              >
                <span>Read Article</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              width={80}
              height={80}
              alt="Inc. Logo"
              className="rounded-md object-contain"
            />
            <div className="space-y-2">
              <h3 className="font-bold">Inc.</h3>
              <p className="text-sm text-muted-foreground">
                "The hosts bring a unique perspective to business growth that's
                both practical and inspiring."
              </p>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
              >
                <span>Read Article</span>
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>;
