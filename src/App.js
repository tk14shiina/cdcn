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
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [isFileSubmited, setIsFileSubmited] = useState(false);
	const [jsonText, setJsonText] = useState({});
	const handleClearOutput = () => {
		setIsFilePicked(false);
		setIsFileSubmited(false);
	};
	let formData = new FormData();
	const handleSelectedFile = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		
		console.log(event.target.files)

		formData.append('file', selectedFile);

		fetch(
			'http://172.20.10.5:8000/ocr/file_upload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const handleSubmission = () => {
		setIsFileSubmited(true);
		/*jsonText = {one: "two", three: "four"};*/
		
		fetch(
			'https://catfact.ninja/fact',
			{
				method: 'GET',
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
				setJsonText(result);
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
					<input type="file" name="file" onChange={handleSelectedFile} />
					{isFilePicked ? (
						<div>
							<p>Filetype: {selectedFile.type}</p>
						</div>
					) : (
						<p>Select a file to show details</p>
					)}
					<div>{isFileSubmited?(<div>{jsonText.fact}</div>):(<div>Chưa submit</div>)}</div>
				</Grid>
				<Grid item xs={2} sm={4} md={8}>
					<button onClick={handleSubmission}>Submit	</button>
				</Grid>
				<Grid item xs={2} sm={4} md={8}>
					<button onClick={handleClearOutput}>Clear output</button>
				</Grid>
				<div>{isFileSubmited ? (
				<Grid item xs={2} sm={4} md={8} >
					<Box style={{border: "1px solid grey", wordWrap: "break-word", maxWidth: "900px", padding: "18px 18px"}}>
					{
						Object.values(test).map(i => 
						<Switch condition={i.predictions.substring(2)}>
							<Case value={'PATIENT_ID'}>
								<span style={{ color: patient_id }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'NAME'}>
								<span style={{ color: name }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'AGE'}>
								<span style={{ color: age }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'GENDER'}>
								<span style={{ color: gender }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'JOB'}>
								<span style={{ color: job }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'ORGANIZATION'}>
								<span style={{ color: organization }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'LOCATION'}>
								<span style={{ color: location }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'DATE'}>
								<span style={{ color: date }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'SYMTOM_AND_DISEASE'}>
								<span style={{ color: symtom_and_disease }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Case value={'TRANSPORTATION'}>
								<span style={{ color: transportation }}> {i.tokens.replace('_', ' ')}</span>
							</Case>
							<Default>
								<span style={{ color: "black" }}> {i.tokens[0]==='<'? null:i.tokens}</span>
							</Default>
						</Switch>)
					}
					</Box>
				</Grid>) : (<div>Chưa có nội dung</div>)}</div>
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
