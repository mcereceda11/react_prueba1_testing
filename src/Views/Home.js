import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Tooltip, Container, Card, IconButton, CardContent, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon, Start, PersonAdd, PersonAddAlt } from '@mui/icons-material'

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cursos/getCursos", {
			method: 'GET'
		})
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result.data)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  return (
		<Container maxWidth="sm">
			<Card sx={{ width: '100%', minWidth: 500 }}>
				<CardContent>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Nombre</TableCell>
									<TableCell>Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									items.map((row) => (
										<TableRow key={row.id}>
											<TableCell>{row.id}</TableCell>
											<TableCell>{row.name}</TableCell>
											<TableCell>
												<IconButton href={'/curso?id_curso=' + row.id}>
													<Start />
												</IconButton>
												<IconButton>
													<EditIcon />
												</IconButton>
												<IconButton>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
		</Container>
  );
}