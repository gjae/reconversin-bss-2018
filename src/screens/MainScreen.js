import React , { Component } from  'react';
import {
	Image,
	ImageBackground,
	TextInput,
	Alert,
	StatusBar
} from 'react-native';


import {
	View,
	Input,
	Content,
	Container,
	Row,
	Col,
	Grid,
	Text,
	Item
} from  'native-base';

var numeral = require('numeral');

export default class MainScreen extends Component{

	constructor(props){
		super(props);
		this.state = {
			converterFrom: 0.00,
			converterTo: 0.00
		}
	}

	_calculate( fromConverter, value ){
		if( fromConverter == 'fuertes' && value != ''){
			monto = [];
			value = value.toString();
			monto = value.split('.');
			value = '';
			for( var i in monto ){
				value += monto[i];
			}

			value = value.replace(',', '.');
			value = parseFloat(value);
			this.setState({
				converterTo: ( 
					(  value == '' ? 0.00 : ( value * Math.pow(10, -5)  ) )
				).toFixed(2),
				converterFrom: value
			});

		} else if( value == '' ) this.setState({ converterTo: 0.00 })
		
	}

	_formatMoney(c, d, t){
	    var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };	

	render(){
		var soberanos = this.state.converterTo;
		return(
			<ImageBackground source={require('../assets/img/background.jpeg')} style={{ width: "100%", height: "100%" }}>
				<StatusBar
					translucent={true}
					backgroundColor={"transparent"}
					barStyle={'dark-content'}
				/>
				<View style={{ width: "100%", height: "100%" }}>
					<Content>
						<Grid>
							<Row>
								<Col  style={{ marginTop: "60%", marginLeft: "2%", width: "20%"  }} >
									<Image source={require('../assets/img/fuerte.png')} />
								</Col>
								<Col style={{ marginTop: "65%", marginLeft: "2%", width: "70%" }} >
									<Item>
										<Input
											keyboardType={'numeric'}
											style={{width: "100%", backgroundColor: "#ffffff"}}
											onChangeText={ text => { this._calculate('fuertes', text) } }
											placeholder={"Monto"}
										/>
									</Item>
								</Col>
							</Row>
							<Row>
								<Col  style={{ marginTop: "5%", marginLeft: "2%", width: "20%"  }} >
									<Image source={require('../assets/img/soberano.png')} />
								</Col>
								<Col style={{ marginTop: "9%", marginLeft: "2%", width: "70%" }} >
									<Item>
										<Input
											keyboardType={'numeric'}
											style={{width: "100%", backgroundColor: "#ffffff"}}
											defaultValue={soberanos}
											disabled
										/>
									</Item>
								</Col>
							</Row>
						</Grid>
					</Content>
				</View>
			</ImageBackground>
		);
	}

}