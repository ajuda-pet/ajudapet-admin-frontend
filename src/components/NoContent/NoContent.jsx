import { Alert } from "react-bootstrap"

const NoContent = ({ message }) => {
    return (
        <>
            <center>
                <img src='./images/no-content.png' width='350' className='mb-2'></img>
            </center>
            <center>
                <strong style={{ fontSize: '17.7px' }} className='px-1'>🐾  &nbsp; {message}</strong>
            </center>
        </>
    )

}

export default NoContent