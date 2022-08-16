import React from "react"
import { useAtom } from 'jotai'
import { tocAtom } from '../libs/atoms'

type Props = {
  tocs: {
    id: string
    text: string
    name: string
  }[]
}

const Toc: React.FC<Props> = () => {
  const [tocs] = useAtom(tocAtom)

  return (
    <div>
      <p className="TableOfContentsHead">目次</p>
      <ul>
        {tocs.map(toc => (
          <li key={toc.id}>
            <a href={`#${toc.text}`}>
              {toc.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Toc
