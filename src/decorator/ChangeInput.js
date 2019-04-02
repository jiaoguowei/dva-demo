import React, { PureComponent } from 'react'

export default function({initValue}) {
  return WrappedComponent => {
    return class Warpper extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          name: '',
        };
        this.onNameChange = this.onNameChange.bind(this)
      }
      onNameChange(e) {
        this.setState({
          name: e.target.value
        })
      }
      render() {
        const newProps = {
          name: {
            value: this.state.name,
            onChange: this.onNameChange,
          }
        }
        console.log('+++++++', initValue)
        return <WrappedComponent {...this.props} {...newProps}/>
      }
    }
  }
}