import { Alert, Table } from 'react-bootstrap'
import './PointTable.css'
import pointsController from '../../../controllers/points.controller'

const PointTable = ({ points }) => {
    return (
        <>
            {!points.length && <Alert>Cadastre seu ponto de adoção!</Alert>}

            {points.length && <Table striped bordered hover size="sm">
                <thead className='p-5'>
                    <tr>
                        <th>🏡 Ponto de Adoção</th>
                        <th>📍 Endereço</th>
                        <th>🐾 Σ Pets</th>
                        <th>🗓️ Data</th>
                    </tr>
                </thead>
                <tbody>
                   {points && points.length && points.map(point => (
                        <tr key={point.id}>
                            <th>{point.name}</th>
                           <th>{point.addressStreet}, {point.addressNumber}. {point.addressNeighborhood}. {point.addressCity}, {point.addressState}.</th>
                            <th>{point.pets ? point.pets.length : 0}</th>
                            <th>{point.createdAt}</th>
                        </tr>
                   ))}
                </tbody>
            </Table>}
        </>
    )
}

export default PointTable