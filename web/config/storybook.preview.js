import React from 'react'

export const decorators = [
  (Story) => (
    <div style={{ padding: '1em', backgroundColor: '#312e2b' }}>
      <Story />
    </div>
  ),
]
