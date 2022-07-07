import React, { Fragment, useEffect, useState } from 'react';
import './card_style.css'

const CardComponent = () => {
	const [initial_page, setPage] = useState(0);
	const [data, setData] = useState([
		{
			"questionid": 1,
			"question": "Select your data",
			"questiontype": "Radio",
			"attributetype": 2,
			"validation": true,
			"questionoption": [{
				"optionid": 1,
				"optionvalue": "A",
				"price": 1800,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 2,
				"optionvalue": "B",
				"price": 2000,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 3,
				"optionvalue": "C",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}]
		}, {
			"questionid": 2,
			"question": "Do you want a bike",
			"questiontype": "Radio",
			"attributetype": 2,
			"validation": false,
			"questionoption": [{
				"optionid": 14,
				"optionvalue": "Yes",
				"price": 2000,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 15,
				"optionvalue": "No",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}]
		}, {
			"questionid": 3,
			"question": "Date & Time Slot",
			"questiontype": "Date",
			"attributetype": 4,
			"validation": false,
			"questionoption": [{
				"optionid": 16,
				"optionvalue": "",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": null
			}]
		}, {
			"questionid": 4,
			"question": "package selection test",
			"questiontype": "Radio",
			"attributetype": 3,
			"validation": false,
			"questionoption": [{
				"optionid": 36,
				"optionvalue": "a",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 37,
				"optionvalue": "b",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 38,
				"optionvalue": "c",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}]
		}, {
			"questionid": 6,
			"question": "Enter Your exprience details",
			"questiontype": "Textarea",
			"attributetype": 2,
			"validation": false,
			"questionoption": [{
				"optionid": 39,
				"optionvalue": "",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}]
		}, {
			"questionid": 7,
			"question": "testing check box",
			"questiontype": "Checkbox",
			"attributetype": 1,
			"validation": false,
			"questionoption": [{
				"optionid": 41,
				"optionvalue": "A",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 42,
				"optionvalue": "B",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}, {
				"optionid": 43,
				"optionvalue": "C",
				"price": 0,
				"optionaction": "",
				"selected": false,
				"subquestion": []
			}]
		}])

	const [answer, setAnswer] = useState({});
	const [button_enable, setButtonEnable] = useState(false);
	const [showResultPage, setResultPage] = useState(false);
	var handleClick = () => {
		if (initial_page < data.length - 1) {
			setPage(initial_page + 1)
		}
		else
			setResultPage(true)

	}

	useEffect(() => {
		if (button_enable === true) {
			setButtonEnable(true)
		}
		else {
			setButtonEnable(false)
		}
	}, [initial_page])

	useEffect(() => {
		if (Object.keys(answer).length === 0) {
			setAnswer({ 0: "YOU DIDn't answer any question" })
		}
		else {
			delete answer[0]
		}
	});

	const type_key = {
		"Radio": "radio",
		"Date": "date",
		"Checkbox": "checkbox",
		"Textarea": "text"
	}

	var handlePrevClick = (event) => {
		event.preventDefault()
		if (initial_page !== 0)
			setPage(initial_page - 1)
	}

	var handleDateChange = (event, index) => {
		let clickId = event.target.id
		let latest_obj = [...data]
		let temp_array = [...latest_obj[index].questionoption]
		let match = temp_array.findIndex(function (field) {
			return field.optionid == clickId
		})
		temp_array[match].optionvalue = event.target.value
		latest_obj[index].questionoption = temp_array
		setData(latest_obj)
		setButtonEnable(true)
		let value_text = event.target.value;
		let res = {
			...answer
		}
		res[data[index].question] = value_text
		setAnswer(res);
	}

	var handleInputClick = (event, index) => {
		let clickId = event.target.id
		let latest_obj = [...data]
		let temp_array = [...latest_obj[index].questionoption]
		let match = temp_array.findIndex(function (field) {
			return field.optionid == clickId
		})
		temp_array[match].selected = true
		latest_obj[index].questionoption = temp_array
		setData(latest_obj)
		setButtonEnable(true)
		let value_text = event.target.value;
		let res = {
			...answer
		}
		res[data[index].question] = value_text
		setAnswer(res);
	}
	return <div className='main-wrapper'>
		<div className='card-component'>
			<form>
			<div className='header'>
				{
					!showResultPage &&
					<button style={initial_page === 0 ? { color: "grey", cursor: "not-allowed" } : { color: "black" }} onClick={(event) => handlePrevClick(event)}>
						<b>&#x2190;</b>
					</button>
				}
			</div>
			{!showResultPage &&
				<div>
					<div className='main-body'>
						<p>{data[initial_page].question}</p>
						<div className='option-style'>
							<table className='table-row'>
								{
									data[initial_page].questionoption.map((e) => (
										<tr >
											<td>{type_key[data[initial_page].questiontype] !== "date" && type_key[data[initial_page].questiontype] !== "text" ?<div> <input id={e.optionid} checked={e.selected} onClick={(e) => handleInputClick(e, initial_page)} key={e.optionid} type={type_key[data[initial_page].questiontype]} name="1" value={e.optionvalue} required="true" /> <label>{e.optionvalue}</label></div>: <div><input id={e.optionid} checked={e.selected} onChange={(e) => handleDateChange(e, initial_page)} key={e.optionid} type={type_key[data[initial_page].questiontype]} value={e.optionvalue} name="1" required="true" /></div>}</td>
										</tr>)
									)
								}
							</table>
						</div>
					</div>
					<div className='footer'>
						<button disabled={!button_enable} onClick={() => handleClick()}>{initial_page !== data.length - 1 ? "NEXT" : "SUBMIT"}</button>
					</div>
				</div>
			}
			{
				showResultPage &&
				<Fragment>
					<h1 style={{padding:"10px"}}>ANSWER PAGE</h1>
				<table >
					<tr>
						<td><b>QUESTION</b></td>
						<td><b>Your answer</b></td>
						</tr>
					{
						Object.keys(answer).map((e) => (
							<tr >
								<td>{e}</td>
								<td>{answer[e]}</td>
							</tr>)
						)
					}
				</table>
				</Fragment>
			}
			</form>
		</div>
	</div>

};


export default CardComponent;