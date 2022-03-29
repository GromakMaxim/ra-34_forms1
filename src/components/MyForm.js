import React, {Component} from "react";

export default class MyForm extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            inputValue: '',
            hex: '',
            rgb: 'Отправить',
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
            console.log(rgb)
            this.setState({
                hex: event.target.value,
                rgb: rgb,
                inputValue: event.target.value
            });
            console.log('parsed')
        } else {
            this.setState({
                inputValue: event.target.value
            })

            if (event.target.value.length > 7) {
                this.setState({
                    inputValue: event.target.value,
                    hex: '#e94b35',
                    rgb: 'ошибка',
                })
                console.log('ошибка')
            }
        }
    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.inputValue);
        event.preventDefault();
        this.setState({
            parsedValue: this.state.inputValue
        })
    }

    render() {
        let label = (this.state.rgb === 'ошибка') ? <input type="submit" value='Ошибка!'/> :
            <input type="submit" value={this.state.rgb}/>
        let color = (this.state.rgb === 'ошибка') ? {backgroundColor: '#e94b35'} : {backgroundColor: this.state.rgb};

        return (
            <form className='myForm' style={color} onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
                </label>
                {label}
            </form>
        );
    }
}


