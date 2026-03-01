import React from 'react'

const Loading = () => {
  return (
  <div className='h-full w-full flex items-center justify-center'>

<div className="flex items-center justify-center bg-neutral-secondary-soft h-56 w-56  text-fg-brand-strong text-xs font-medium rounded-base">
    <div className="px-6 py-px ring-1 ring-inset ring-brand-subtle text-fg-brand-strong text-xs font-medium rounded-sm bg-brand-softer animate-pulse">loading...</div>
</div>
</div>

  )
}

export default Loading
