"use client"

interface PreviewProps {
  content: string
}

export default function Preview({ content }: PreviewProps) {
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
}

