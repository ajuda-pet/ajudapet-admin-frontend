import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastComponent( { variant }) {
    return (
        
        <Toast show={true} bg={variant}>
            <Toast.Header>
                <strong className="me-auto">TESTE</strong>
                <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>See? Just like this.</Toast.Body>
        </Toast>
    );
}

export default ToastComponent;