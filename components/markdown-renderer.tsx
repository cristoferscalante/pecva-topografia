import Image from "next/image"
import Link from "next/link"

type MarkdownRendererProps = {
  content: string
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; alt: string; src: string }

type InlineToken =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "em"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; label: string; href: string }

function parseInline(content: string): InlineToken[] {
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g
  const tokens: InlineToken[] = []
  let lastIndex = 0

  for (const match of content.matchAll(pattern)) {
    const value = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      tokens.push({ type: "text", value: content.slice(lastIndex, index) })
    }

    if (value.startsWith("[") && value.includes("](")) {
      const linkMatch = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        tokens.push({ type: "link", label: linkMatch[1], href: linkMatch[2] })
      }
    } else if (value.startsWith("**")) {
      tokens.push({ type: "strong", value: value.slice(2, -2) })
    } else if (value.startsWith("*")) {
      tokens.push({ type: "em", value: value.slice(1, -1) })
    } else if (value.startsWith("`")) {
      tokens.push({ type: "code", value: value.slice(1, -1) })
    }

    lastIndex = index + value.length
  }

  if (lastIndex < content.length) {
    tokens.push({ type: "text", value: content.slice(lastIndex) })
  }

  return tokens
}

function renderInline(content: string) {
  return parseInline(content).map((token, index) => {
    if (token.type === "strong") {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-foreground">
          {token.value}
        </strong>
      )
    }

    if (token.type === "em") {
      return (
        <em key={`em-${index}`} className="italic">
          {token.value}
        </em>
      )
    }

    if (token.type === "code") {
      return (
        <code
          key={`code-${index}`}
          className="rounded bg-muted px-2 py-1 font-mono text-sm text-foreground"
        >
          {token.value}
        </code>
      )
    }

    if (token.type === "link") {
      const external = token.href.startsWith("http")

      return (
        <Link
          key={`link-${index}`}
          href={token.href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-secondary"
        >
          {token.label}
        </Link>
      )
    }

    return <span key={`text-${index}`}>{token.value}</span>
  })
}

function parseMarkdown(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") })
      index += 1
      continue
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") })
      index += 1
      continue
    }

    if (line.startsWith("> ")) {
      blocks.push({ type: "blockquote", text: line.replace(/^>\s+/, "") })
      index += 1
      continue
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      blocks.push({ type: "image", alt: imageMatch[1], src: imageMatch[2] })
      index += 1
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().replace(/^-+\s*/, ""))
        index += 1
      }
      blocks.push({ type: "ul", items })
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s*/, ""))
        index += 1
      }
      blocks.push({ type: "ol", items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const current = lines[index].trim()
      if (
        !current ||
        current.startsWith("## ") ||
        current.startsWith("### ") ||
        current.startsWith("> ") ||
        current.startsWith("- ") ||
        /^\d+\.\s/.test(current) ||
        /^!\[([^\]]*)\]\(([^)]+)\)$/.test(current)
      ) {
        break
      }
      paragraphLines.push(current)
      index += 1
    }

    blocks.push({ type: "p", text: paragraphLines.join(" ") })
  }

  return blocks
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content)

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={`h2-${index}`} className="text-2xl font-semibold text-foreground">
              {renderInline(block.text)}
            </h2>
          )
        }

        if (block.type === "h3") {
          return (
            <h3 key={`h3-${index}`} className="text-xl font-semibold text-foreground">
              {renderInline(block.text)}
            </h3>
          )
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={`blockquote-${index}`}
              className="border-l-4 border-secondary/40 pl-5 text-lg leading-8 text-foreground/80"
            >
              {renderInline(block.text)}
            </blockquote>
          )
        }

        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`} className="space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground">
                  <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === "ol") {
          return (
            <ol key={`ol-${index}`} className="space-y-4">
              {block.items.map((item, itemIndex) => (
                <li
                  key={`${item}-${itemIndex}`}
                  className="flex items-start gap-4 text-sm leading-7 text-foreground"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary">
                    {itemIndex + 1}
                  </span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ol>
          )
        }

        if (block.type === "image") {
          return (
            <div
              key={`image-${index}`}
              className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border"
            >
              <Image
                src={block.src}
                alt={block.alt || "Imagen del articulo"}
                fill
                className="object-cover"
              />
            </div>
          )
        }

        return (
          <p key={`p-${index}`} className="text-base leading-8 text-muted-foreground">
            {renderInline(block.text)}
          </p>
        )
      })}
    </div>
  )
}
