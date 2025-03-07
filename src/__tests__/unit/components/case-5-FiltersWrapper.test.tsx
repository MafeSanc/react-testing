import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import useFilters from '../../../hooks/useFilters'

import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  it('❌ should render all children passed to it', () => {
    const { debug, getByTestId } = render(
      <FiltersWrapper>
        <p data-testid="TestParagraph"></p>
      </FiltersWrapper>,
    )

    debug()
    expect(getByTestId('TestParagraph')).toBeInTheDocument()
  })

  it('❌ should update the filters context with correct state values', () => {
    const hideMessage = 'HIDE FILTERS'
    const showMessage = 'SHOWING FILTERS'
    const { debug, getByText } = render(
      <FiltersWrapper>
        <FiltersContext.Consumer>
          {({ showingFilters, toggleShowingFilters }) => {
            return (
              <button onClick={toggleShowingFilters}>
                {showingFilters ? showMessage : hideMessage}
              </button>
            )
          }}
        </FiltersContext.Consumer>
      </FiltersWrapper>,
    )

    expect(getByText(hideMessage)).toBeInTheDocument()

    fireEvent.click(getByText(hideMessage))

    expect(getByText(showMessage)).toBeInTheDocument()
  })
  //////////////////////////////////////////////////////////////////
  const hideMessage = 'HIDE FILTERS'
  const showMessage = 'SHOWING FILTERS'
  const setupFiltersWrapper = () =>
    render(
      <FiltersWrapper>
        <FiltersContext.Consumer>
          {({ showingFilters, toggleShowingFilters }) => {
            return (
              <button onClick={toggleShowingFilters}>
                {showingFilters ? showMessage : hideMessage}
              </button>
            )
          }}
        </FiltersContext.Consumer>
      </FiltersWrapper>,
    )

  it('❌ should update the body style to prevent scrolling when filter is toggled', () => {
    const { getByText, debug } = setupFiltersWrapper()

    fireEvent.click(getByText(hideMessage))

    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.click(getByText(hideMessage))

    expect(document.body.style.overflow).toBe('scroll')
  })
})
