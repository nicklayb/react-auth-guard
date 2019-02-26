import React from 'react'

const Loading = ({ isLoading, children }) => (isLoading
  ? <h1>Loading</h1>
  : children
)

export default Loading
