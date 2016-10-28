import React, { Component } from 'react'
import SelectField from './SelectField'
import Chip from 'material-ui/Chip/Chip'
import DropDown from 'material-ui/DropDownMenu/DropDownMenu'
import MenuItem from 'material-ui/MenuItem/MenuItem'
import countries from './countries'
import flagIconCSSCountryCodes from './flagIconCSSCountryCodes'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import './flag-icon.css'

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
}
const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal'
}

class CodeExample extends Component {
  componentWillMount () {
    this.setState({
      value1: '',
      value2: [],
      value3: [],
      value4: 'K'
    })
  }

  handleSelection = (name, value) => this.setState({ [name]: value })

  handleDropDownChange = (event, index, value) => this.setState({ value4: value })

  handleCustomDisplaySelections = (values) => {
    if (values.length) {
      if (typeof values === 'string') return <Chip>{values}</Chip>
      return <div style={{display: 'flex'}}>{values.map((v, i) => <Chip key={i}>{v}</Chip>)}</div>
    } else return 'select some values'
  }

  render () {
    const countriesNodeList = countries.map((c, i) => {
      const countryCode = c['Alpha-2 code'].toLowerCase()
      const countryLabel = c['English short name']
      if (flagIconCSSCountryCodes.includes(countryCode)) {
        return (
          <div value={countryCode} label={countryLabel} style={menuItemStyle}>
            <div>{countryLabel}</div>
            <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
          </div>
        )
      }
    })
    
    return (
        <section style={containerStyle}>

            <h4>Basic dropdowns</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SelectField
                name='value1'
                hintText='Single value'
                onSelect={this.handleSelection}
                value={this.state.value1}
                style={{ minWidth: 150, marginRight: 40 }}
              >
                <div value='A' label='A'>Option A</div>
                <div value='B' label='B'>Option B</div>
                <div value='C' label='C'>Option C</div>
              </SelectField>

              <SelectField
                name='value2'
                multiple
                hintText='Multiple values'
                onSelect={this.handleSelection}
                value={this.state.value2}
                style={{ minWidth: 150 }}
              >
                <div value='D' label='D'>Option D</div>
                <div value='E' label='E'>Option E</div>
                <div value='F' label='F'>Option F</div>
              </SelectField>
            </div>

            <h4 style={{ marginTop: 80 }}>Composability example</h4>
            <SelectField
              name='value3'
              multiple
              hintText='using DisplaySelectionsRenderer'
              onSelect={this.handleSelection}
              value={this.state.value3}
              displaySelectionsRenderer={this.handleCustomDisplaySelections}
              menuProps={{maxHeight: 370}}
              style={{ width: 300 }}
            >
              {countriesNodeList}
            </SelectField>

            <h4 style={{ marginTop: 80 }}>Original Material-UI DropDown</h4>
            <DropDown
              name='value4'
              onChange={this.handleDropDownChange}
              value={this.state.value4}
              style={{ minWidth: 150 }}
            >
              <MenuItem value='J' primaryText='Option J' />
              <MenuItem value='K' primaryText='Option K' />
              <MenuItem value='L' primaryText='Option L' />
            </DropDown>

            <fieldset style={{ marginTop: 40 }}>
              <legend>State values</legend>
              <div>State 1: {this.state.value1}</div>
              <div>State 2: {this.state.value2.join(', ')}</div>
              <div>State 3: {this.state.value3.join(', ')}</div>
              <div>State 4: {this.state.value4}</div>
            </fieldset>

        </section>
    )
  }
}

export default CodeExample