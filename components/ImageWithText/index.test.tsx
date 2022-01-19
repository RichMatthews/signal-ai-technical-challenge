import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ImageWithText } from './index'

describe('ImageWithText Component', () => {
  it('renders correctly', () => {
    render(<ImageWithText image="https://test.jpg" text="Test Text" />)

    expect(screen.getByText('Test Text')).toBeTruthy()
  })
})
