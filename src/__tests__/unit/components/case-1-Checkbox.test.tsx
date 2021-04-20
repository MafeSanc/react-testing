import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */

describe('The <Checkbox /> component', () => {
  const defaultCheckboxProps = {
    label: 'TEST_CHECKBOX_LABEL',
    id: 'TEST_CHECKBOX_ID',
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
    checked: false,
  }

  //this const is meant to avoid repetition
  const setupCheckbox = (props = defaultCheckboxProps) => render(<Checkbox {...props} />)

  it('❌ Should render the label and checkbox the user will see', () => {
    // const container = document.createElement('div')
    // ReactDOM.render(
    //   <Checkbox {...defaultCheckboxProps} />,
    //   container
    // )

    // expect(container.querySelector('label')).not.toBeNull()
    // expect(container.querySelector('input[type="checkbox"]')).not.toBeNull()

    // const{ getByLabelText, debug} = render(
    //   <Checkbox {...defaultCheckboxProps}  />,
    // )
    // debug(getByLabelText('TEST_CHECKBOX_LABEL'))

    const { asFragment } = render(<Checkbox {...defaultCheckboxProps} />)
    // console.log(asFragment())
    expect(asFragment()).toMatchInlineSnapshot()
  })

  it(' Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText, debug } = render(
      <Checkbox {...defaultCheckboxProps} />,
    )

    expect(getByLabelText('TEST_CHECKBOX_LABEL')).toBeInTheDocument()
  })


  it('❌ Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckbox()

    const checkbox = getByLabelText(defaultCheckboxProps.label)

    fireEvent.click(checkbox)

    expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })


  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setupCheckbox({
      ...defaultCheckboxProps,
      checked: true
    })

    expect(getByLabelText(defaultCheckboxProps.label)).toBeChecked()

  })

  it('❌ should not fail any accessibility tests', async () => {})
})
