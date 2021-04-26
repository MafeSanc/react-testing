import React, { useRef, useState } from 'react'
import { render, fireEvent } from '@testing-library/react'

import useOutsideClick from '../../../hooks/useOutsideClick'

describe('The useOutsideClick hook', () => {
  const Panel = ()=> {
    const ref = useRef(null)
    const [showing, setShowing] = useState(false)

    useOutsideClick(ref, () => {
      setShowing(!showing)
    })

    return (
      <div ref={ref}>
        <button data-testid="PanelButton">
          {showing ? 'SHOWING BUTTON' : 'HIDING BUTTON'}
        </button>
      </div>
    )
  }

  const PanelToggle = () => {
    const [showing, setShowing] = useState(true)
    return(
      <>
        <button
          data-testid="PanelToggleButton"
          onClick={() => setShowing(false)}
          >
            Toggle Panel
          </button>
          {showing ? <Panel /> : null}
      </>
    )
  }
  // This test is important if you are going to be creating libraries in future.
  // Very important to make sure the component is used the right way.
  // This test can be migrated in future, if the useOutsideClick
  // hook is moved to an external library at your company.
  it('❌ calls the outside click handler when an outside click is initiated', () => {

    const { getByTestId } = render(
      <div>
        <button data-testid='ButtonOutsidePanel'></button>
        <Panel />
      </div>
    )

    expect(getByTestId('PanelButton')).toHaveTextContent('HIDING BUTTON')

    fireEvent.click(getByTestId('ButtonOutsidePanel'))

    
    expect(getByTestId('PanelButton')).toHaveTextContent('SHOWING BUTTON')
  })

  it('❌ cleans up the event listeners after component is unmounted', () => {
    const removeEventListener = jest.spyOn(document, 'removeEventListener')
    
    const {getByTestId} = render(
      <PanelToggle />
    )
    
    fireEvent.click(getByTestId('PanelToggleButton'))

    expect(removeEventListener).toHaveBeenCalled()
  })
})
