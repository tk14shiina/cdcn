import React, {useState} from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import test from './test.json';
import Switch, { Case, Default } from 'react-switch-case';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
const patient_id = "#5400d9";
const name = "#6a5608";
const age = "#a2f48a";
const gender = "#958bad";
const job = "#9ad000";
const organization = "#700059";
const location = "#00b993";
const date = "#3ad9f1";
const symtom_and_disease = "#4d000b";
const transportation ="#e4b84a";
function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [inputOCR, setInputOCR] = useState('Nhập vào đây');
	const [inputSubmitted, setInputSubmitted] = useState(false);
	const [outputNER, setOutputNER] = useState();
	let formData = new FormData();
	const handleClearOutput = () => {
		let newFormData = new FormData();
		formData = newFormData;
		setInputOCR('Nhập vào đây');
		setOutputNER();
		setInputSubmitted(false);
		setSelectedFile(null);
	};
	
	const handleSelectedFile = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleOCRSubmission = () => {
		
		console.log(selectedFile);
		formData.append('file', selectedFile);
		fetch(
			'http://oner.buzzle.works:8000/ocr/file_upload',
			{
				method: 'POST',
				body: formData
			}
		)
			.then((response) => response.json())
			.then((result) => {
				let tempResult = '';
				result.map(i => (
					i.confidence > 80 ? 
						tempResult += (i.text + ' '): tempResult));
				console.log(tempResult);
				setInputOCR(tempResult);
			})
			.catch((error) => {
				console.error('Error:', error);
			});	
	};
	const handleFileTextSubmission = () => {
		
		console.log(selectedFile);
		formData.append('file', selectedFile);
		fetch(
			'http://oner.buzzle.works:8000/ner/file_upload',
			{
				method: 'POST',
				body: formData
			}
		)
			.then((response) => response.json())
			.then((result) => {
				let tempResult = [];
				result.map(i => 
						tempResult.push([i.token, i.prediction]));
				setOutputNER(tempResult);
				setInputSubmitted(true);
			})
			.catch((error) => {
				console.error('Error:', error);
			});	
	};
	const handleNERSubmission = () => {
		fetch(
			'http://oner.buzzle.works:8000/ner/text_upload',
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({text: inputOCR})	
			}
		)
			.then((response) => response.json())
			.then((result) => {
				let tempResult = [];
				result.map(i => 
						tempResult.push([i.token, i.prediction]));
				setOutputNER(tempResult);
				setInputSubmitted(true);
			})
			.catch((error) => {
				console.error('Error:', error);
			});		
			
	};
	return(
   		<div>
			<Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 16 }}>
				<Grid item spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
				<Grid item xs={2} sm={4} md={8}>
					<input type="file" name="file" onChange={handleSelectedFile}/>
				</Grid>
				<Grid item xs={2} sm={4} md={8}>
					<button onClick={handleOCRSubmission}>Submit OCR</button>
				</Grid>
				
				
				<Grid item xs={2} sm={4} md={8}>
					<form>
        				<input
          				type="text" 
          				value={inputOCR}
          				onChange={(e) => setInputOCR(e.target.value)}
        				/>
    				</form>
				</Grid>
				<Grid item xs={2} sm={4} md={8}>
					<button onClick={handleNERSubmission}>Submit NER</button>
				</Grid>
				<div>{inputSubmitted ? (
				<Grid item xs={2} sm={4} md={8}>
					<Box style={{border: "1px solid grey", wordWrap: "break-word", maxWidth: "900px", padding: "18px 18px"}}>
					{
						outputNER.map(i => 
						<Switch condition={i[1].substring(2)}>
							<Case value={'PATIENT_ID'}>
								<span style={{ color: patient_id }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'NAME'}>
								<span style={{ color: name }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'AGE'}>
								<span style={{ color: age }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'GENDER'}>
								<span style={{ color: gender }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'JOB'}>
								<span style={{ color: job }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'ORGANIZATION'}>
								<span style={{ color: organization }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'LOCATION'}>
								<span style={{ color: location }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'DATE'}>
								<span style={{ color: date }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'SYMTOM_AND_DISEASE'}>
								<span style={{ color: symtom_and_disease }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Case value={'TRANSPORTATION'}>
								<span style={{ color: transportation }}> {i[0].replace('_', ' ')}</span>
							</Case>
							<Default>
								<span style={{ color: "black" }}> {i[0][0]==='<'? null:i[0].replace('_', ' ')}</span>
							</Default>
						</Switch>)
					}
					</Box>
				</Grid>) : (<div>Chưa có kết quả</div>)}</div>
				<Grid item xs={2} sm={4} md={8}>
					<button onClick={handleClearOutput}>Clear output</button>
				</Grid>
			</Grid>
			<Grid item> 
			<Box
      sx={{ width: '100%', height: 670, maxWidth: 360, bgcolor: 'white'}}
    >
					<List disablePadding={true}>
					<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: patient_id,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>PATIENT_ID</ListItemButton>
					</ListItem>
					<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: name,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>NAME</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: age,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>AGE</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: gender,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>GENDER</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: job,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>JOB</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: organization,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>ORGANIZATION</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: location,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>LOCATION</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: date,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>DATE</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: symtom_and_disease,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>SYMPTOM_AND_DISEASE</ListItemButton>
						</ListItem>
						<ListItem> 
						<ListItemButton style={{borderRadius: 10,backgroundColor: transportation,color:"white",  align: "center", fontSize: "12px", height: "50px", width: "200px"}}>TRANSPORTATION</ListItemButton>
						</ListItem>

				</List>
				</Box>
				</Grid>
			</Grid>
		</div>
	)
}

export default App;
