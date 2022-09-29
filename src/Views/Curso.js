import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Tooltip, Select, SelectChangeEvent, MenuItem, Alert, Snackbar, TextField, Modal, Box, Button, Grid, Container, Card, IconButton, CardContent, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon, PersonAdd, PersonAddAlt, NoteAdd, SignalCellularNullSharp } from '@mui/icons-material'

export default function Curso() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [idCurso, setIdCurso] = useState(null);
  const [item, setItem] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newNota, setNewNota] = useState(null);
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openExamen, setOpenExamen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [openAddProfesor, setOpenAddProfesor] = useState(false);
  const [openAddAlumno, setOpenAddAlumno] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [users, setUsers] = useState(null);
	
  const handleOpen = (user) => {
		setEditingUser(user)
		setOpen(true)
	};

  const handleOpenExamen = (user) => {
		setEditingUser(user)
		setOpenExamen(true)
	};

  const handleClose = () => {
		setEditingUser(null)
		setOpen(false);
		setOpenExamen(false);
	}

  const handleOpenSnack = (message) => {
		setSnackMessage(message)
		setOpenSnack(true)
	}

  const handleCloseSnack = () => {
		setSnackMessage('')
		setOpenSnack(false)
	}

	const openAddProfesorModal = () => {
		setOpenAddProfesor(true)
	}

	const openAddAlumnosModal = () => {
		setOpenAddAlumno(true)
	}

	const handleCloseAdd = () => {
		setOpenAddProfesor(false)
		setOpenAddAlumno(false)
		setSelectedUserID(null)
	}

	const handleChangeSelectdUser = (event: SelectChangeEvent) => {
		setSelectedUserID(event.target.value)
  }

	const addNota = () => {
		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
    fetch("http://localhost:3000/notas/addUserNota?curso_id=" + idCurso + '&user_id=' + editingUser.id + '&nota=' + newNota, options)
      .then(res => res.json())
      .then(
        (result) => {
					if(result.error){
						handleOpenSnack(result.error.message)
					}
          getCursoData(idCurso)
					handleClose()
        },
        (error) => {
					console.log(error)
        }
      )
	}

	const addNotaExamen = () => {
		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
    fetch("http://localhost:3000/notas/addUserNotaExamen?curso_id=" + idCurso + '&user_id=' + editingUser.id + '&nota=' + newNota, options)
      .then(res => res.json())
      .then(
        (result) => {
					if(result.error){
						handleOpenSnack(result.error.message)
					}
          getCursoData(idCurso)
					handleClose()
        },
        (error) => {
        }
      )
	}

	const addProfesor = () => {
		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
    fetch("http://localhost:3000/cursos/addProfesorToCurso?curso_id=" + idCurso + '&user_id=' + selectedUserID, options)
      .then(res => res.json())
      .then(
        (result) => {
					if(result.error){
						handleOpenSnack(result.error.message)
					}
          getCursoData(idCurso)
					handleClose()
        },
        (error) => {
        }
      )
	}

	const addAlumno = () => {
		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
    fetch("http://localhost:3000/cursos/addAlumnoToCurso?curso_id=" + idCurso + '&user_id=' + selectedUserID, options)
      .then(res => res.json())
      .then(
        (result) => {
					if(result.error){
						handleOpenSnack(result.error.message)
					}
          getCursoData(idCurso)
					handleClose()
        },
        (error) => {
        }
      )
	}

	const getCursoData = (id_curso) => {
    fetch("http://localhost:3000/cursos/getCurso?curso_id=" + id_curso, {
			method: 'GET'
		})
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItem(result.data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
	}

	const getUsersForSelect = (type = 1) => {
    fetch("http://localhost:3000/users/getUsers", {
			method: 'GET'
		})
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result.data)
					result.data[0] && setSelectedUserID(result.data[0].id)
					if(type == 1){
						openAddProfesorModal()
					}
					else if(type == 2){
						openAddAlumnosModal()
					}
        },
        (error) => {
        }
      )
	}

  useEffect(() => {
		const id_curso = parseInt( searchParams.get('id_curso') )
		setIdCurso(id_curso)
		getCursoData(id_curso)
  }, [])

  return (
		<Container>

			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
				<Alert severity="warning" >{snackMessage}</Alert>
			</Snackbar>

			<Card sx={{ width: '100%', minWidth: 1000 }}>
				<CardContent>
					{
						item ?
						<div>
							<h3>{item.curso.name}</h3>
							<p>Profesor: {item.profesor ? item.profesor.User.name:'--'}</p>
							<p>Cantidad Alumnos: {item.alumnos ? item.alumnos.length:'--'}</p>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<Button variant="contained" size="small" fullWidth onClick={getUsersForSelect}>Agregar Profesor</Button>
								</Grid>
								<Grid item xs={4}>
									<Button variant="contained" size="small" fullWidth sx={{ mb: 1 }} onClick={() => getUsersForSelect(2)}>Agregar Alumno</Button>
								</Grid>
							</Grid>

							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Alumno</TableCell>
											<TableCell>Nota 1</TableCell>
											<TableCell>Nota 2</TableCell>
											<TableCell>Nota 3</TableCell>
											<TableCell>Nota 4</TableCell>
											<TableCell>Nota Examen</TableCell>
											<TableCell>Promedio Final</TableCell>
											<TableCell>Estado</TableCell>
											<TableCell>Acción</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											(item && item.alumnos) && item.alumnos.map((row) => (
												<TableRow key={row.id}>
													<TableCell>{row.User.name}</TableCell>
													<TableCell>{row.Notas && row.Notas[0] ? row.Notas[0].nota:'--'}</TableCell>
													<TableCell>{row.Notas && row.Notas[1] ? row.Notas[1].nota:'--'}</TableCell>
													<TableCell>{row.Notas && row.Notas[2] ? row.Notas[2].nota:'--'}</TableCell>
													<TableCell>{row.Notas && row.Notas[3] ? row.Notas[3].nota:'--'}</TableCell>
													<TableCell>{row.Notas && row.Notas[4] ? row.Notas[4].nota:'--'}</TableCell>
													<TableCell>{row.nota_final ? row.nota_final:'--'}</TableCell>
													<TableCell>{row.estado ? row.estado:'Pendiente'}</TableCell>
													<TableCell>
														<Tooltip title="Agregar nota al alumno">
															<IconButton onClick={() => handleOpen(row.User)}>
																<NoteAdd />
															</IconButton>
														</Tooltip>
														<Tooltip title="Agregar nota examen">
															<IconButton onClick={() => handleOpenExamen(row.User)} disabled={!row.estado || row.estado != 'Examen'}>
																<NoteAdd />
															</IconButton>
														</Tooltip>
													</TableCell>
												</TableRow>
											))
										}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
						:
						<div>
							No hay datos
						</div>
					}
				</CardContent>
			</Card>
			{ users &&
				<div>
					<Modal
						open={openAddProfesor}
						onClose={handleCloseAdd}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<p>Agregar profesor al curso</p>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedUserID}
								label="Selecionar Profesor"
								onChange={handleChangeSelectdUser}
							>
								{
									users.map((user) => (
										<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
									))
								}
							</Select>
							<Button variant="contained" size="small" fullWidth onClick={addProfesor}>Agregar Profesor</Button>
						</Box>
					</Modal>
					<Modal
						open={openAddAlumno}
						onClose={handleCloseAdd}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<p>Agregar alumno al curso</p>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedUserID}
								label="Selecionar Usuario"
								onChange={handleChangeSelectdUser}
							>
								{
									users.map((user) => (
										<MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
									))
								}
							</Select>
							<Button variant="contained" size="small" fullWidth onClick={addAlumno}>Agregar Alumno</Button>
						</Box>
					</Modal>
				</div>
			}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p>Agregar nota a <b>{editingUser ? editingUser.name:'-'}</b></p>
					<TextField id="outlined-basic" type="number" label="Nota" variant="outlined" fullWidth size="small" helperText="Ejemplo: 5.5" onChange={(newValue) => setNewNota(newValue.target.value)}/>
					<Button variant="contained" size="small" fullWidth onClick={addNota} disabled={!newNota}>Agregar Nota</Button>
				</Box>
			</Modal>
			<Modal
				open={openExamen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p>Agregar nota examen a <b>{editingUser ? editingUser.name:'-'}</b></p>
					<TextField id="outlined-basic" type="number" label="Nota" variant="outlined" fullWidth size="small" helperText="Ejemplo: 5.5" onChange={(newValue) => setNewNota(newValue.target.value)}/>
					<Button variant="contained" size="small" fullWidth onClick={addNotaExamen} disabled={!newNota}>Agregar Nota</Button>
				</Box>
			</Modal>
		</Container>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};