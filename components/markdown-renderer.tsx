"use client"

import Image from "next/image"
import Link from "next/link"
import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type MarkdownRendererProps = {
  content: string
}

type FaqItem = {
  question: string
  answer: string
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; alt: string; src: string }
  | { type: "faq"; title: string; items: FaqItem[] }

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

    if (!line || line === "---" || line === "***") {
      index += 1
      continue
    }

    // Detect FAQs section for interactive accordion
    if (/^##\s*(Preguntas\s+[Ff]recuentes|FAQs?)/i.test(line)) {
      const faqTitle = line.replace(/^##\s+/, "")
      const faqItems: FaqItem[] = []
      index += 1

      while (index < lines.length) {
        const curLine = lines[index].trim()

        if (!curLine || curLine === "---" || curLine === "***") {
          index += 1
          continue
        }

        // Stop if a new H2 begins
        if (curLine.startsWith("## ")) {
          break
        }

        if (curLine.startsWith("### ")) {
          const question = curLine.replace(/^###\s+/, "")
          index += 1
          const answerParagraphs: string[] = []

          while (index < lines.length) {
            const nextL = lines[index].trim()
            if (
              !nextL ||
              nextL === "---" ||
              nextL.startsWith("### ") ||
              nextL.startsWith("## ")
            ) {
              if (nextL.startsWith("### ") || nextL.startsWith("## ")) {
                break
              }
              index += 1
              continue
            }
            answerParagraphs.push(nextL)
            index += 1
          }

          faqItems.push({
            question,
            answer: answerParagraphs.join(" "),
          })
          continue
        }

        index += 1
      }

      if (faqItems.length > 0) {
        blocks.push({ type: "faq", title: faqTitle, items: faqItems })
      } else {
        blocks.push({ type: "h2", text: faqTitle })
      }
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
        current === "---" ||
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
        if (block.type === "faq") {
          return (
            <div
              key={`faq-${index}`}
              className="mt-12 rounded-[2rem] border border-border/90 bg-card/70 p-6 md:p-8 shadow-sm backdrop-blur-xs"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {renderInline(block.title)}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Respuestas técnicas directas del equipo de ingeniería de Consorcio PECVA
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {block.items.map((item, itemIdx) => (
                  <AccordionItem
                    key={`faq-item-${itemIdx}`}
                    value={`faq-${itemIdx}`}
                    className="rounded-2xl border border-border/80 bg-background/60 px-5 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.02]"
                  >
                    <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground transition-colors hover:text-primary hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1 text-sm leading-7 text-muted-foreground">
                      {renderInline(item.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        }

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
