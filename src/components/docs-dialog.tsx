import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

interface DocsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocsDialog({ open, onOpenChange }: DocsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Documentation</DialogTitle>
          <DialogDescription>
            How to use Speedtest Server Explorer
          </DialogDescription>
        </DialogHeader>

        <Accordion type="multiple" defaultValue={['search']} className="text-sm">

          <AccordionItem value="search">
            <AccordionTrigger className="text-sm font-medium">How Search Works</AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground leading-relaxed">
              <p>
                The first word in your query is sent to the Speedtest API and searches across
                ISP names, cities, and countries globally.
              </p>
              <p>
                Any additional words are applied as local filters on top of the API results —
                every word must match somewhere in the row.
              </p>
              <p className="font-mono text-xs bg-muted rounded px-2 py-1.5 text-foreground">
                Orange France → API: "Orange" → local filter: "France"
              </p>
              <p>
                With no query, the API uses your IP geolocation to return nearby servers first.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="filters">
            <AccordionTrigger className="text-sm font-medium">Filtering &amp; Sorting</AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground leading-relaxed">
              <p>
                Use the <strong className="text-foreground">Country</strong>,{' '}
                <strong className="text-foreground">City</strong>, and{' '}
                <strong className="text-foreground">ISP</strong> faceted filters in the toolbar
                to narrow results by selecting one or more values.
              </p>
              <p>
                Click any column header to sort results. Click again to reverse the sort order.
              </p>
              <p>
                Press <kbd className="inline-flex items-center rounded border bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">/</kbd> anywhere
                on the page to focus the search input.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="server-fields">
            <AccordionTrigger className="text-sm font-medium">Server Fields</AccordionTrigger>
            <AccordionContent>
              <table className="w-full text-xs text-muted-foreground border-separate border-spacing-y-1">
                <thead>
                  <tr className="text-left text-foreground">
                    <th className="pr-3 font-medium">Field</th>
                    <th className="font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ID', 'Unique numeric server identifier'],
                    ['ISP / Sponsor', 'The operator or ISP hosting the server'],
                    ['Country', 'Country where the server is located'],
                    ['City', 'City where the server is located'],
                    ['Host', 'Hostname used for speed tests'],

                  ].map(([field, desc]) => (
                    <tr key={field}>
                      <td className="pr-3 font-mono text-foreground whitespace-nowrap">{field}</td>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="speedtest">
            <AccordionTrigger className="text-sm font-medium">Running a Speed Test</AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground leading-relaxed">
              <p>
                Click the <strong className="text-foreground">Run test</strong> option in the
                action menu (⋯) of any row to open Speedtest.net pre-selected to that server.
              </p>
              <p>
                To run a test from the official CLI, use the <strong className="text-foreground">Copy CLI command</strong> option
                and paste it in your terminal:
              </p>
              <p className="font-mono text-xs bg-muted rounded px-2 py-1.5 text-foreground">
                speedtest --server-id=&lt;id&gt;
              </p>
              <p>
                Install the Speedtest CLI from{' '}
                <a
                  href="https://www.speedtest.net/apps/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:no-underline"
                >
                  speedtest.net/apps/cli
                </a>.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="api" className="border-b-0">
            <AccordionTrigger className="text-sm font-medium">API &amp; Caching</AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground leading-relaxed">
              <p>
                Requests are proxied through a Cloudflare Worker at <code className="text-xs bg-muted text-foreground rounded px-1">/api/servers</code>.
                The worker reads your IP geolocation from the Cloudflare edge and passes it to the Speedtest API.
              </p>
              <p>
                Responses are cached at the edge for <strong className="text-foreground">5 minutes</strong>.
                Each query returns up to <strong className="text-foreground">100 results</strong>.
              </p>
              <div className="space-y-1">
                <p className="text-foreground text-xs font-medium">Query parameters:</p>
                <div className="font-mono text-xs bg-muted rounded px-2 py-1.5 text-foreground space-y-0.5">
                  <div><span className="text-muted-foreground">GET </span>/api/servers</div>
                  <div className="pl-2 text-muted-foreground">?search=<span className="text-foreground">Orange</span>  <span className="italic">optional</span></div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </DialogContent>
    </Dialog>
  )
}
