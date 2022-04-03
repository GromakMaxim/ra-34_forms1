import React, {Component} from "react";

export default class MyForm extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            inputValue: '',
            hex: '',
            rgb: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // example: #0033ff --> 0, 51, 255
    hexToRGB(c) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        let obj = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

        if (obj !== null) return 'rgb(' + obj.r + ', ' + obj.g + ', ' + obj.b + ')';
    }


    handleChange(event) {
        if (event.target.value.match(/#[a-f0-9]{6}\b/gi)) {
            let rgb = this.hexToRGB(event.target.value);
            this.setState({
                hex: event.target.value,
                rgb: rgb,
            });
            console.log('parsed')
        } else {
            this.setState({
                inputValue: event.target.value,
                hex: '',
                rgb: '',
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();


    }

    render() {

        let parsedRGBValue;
        let msg;
        if (this.state.rgb.length !== 0) {
            msg = parsedRGBValue = this.state.rgb
        } else {
            if (this.state.inputValue.length === 7) {
                parsedRGBValue = 'red';
                msg = 'Ошибка!';
            } else {
                parsedRGBValue = '';
                msg = 'color'
            }
        }

        console.log(parsedRGBValue)

        return (
            <form
                className='myForm'
                onSubmit={this.handleSubmit}
                style={{
                    backgroundColor: parsedRGBValue
                }}>
                <div className='wrapper flex-col'>
                    <label>
                        <input type="text" placeholder='example #0033ff' maxLength='7' onChange={this.handleChange}/>
                    </label>
                    <div className='display-color b1'>{msg}</div>
                </div>
            </form>
        );
    }
}


