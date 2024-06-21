import { Col, Container, Row } from 'react-bootstrap'
import styles from './NoAuthContainer.module.css'

const NoAuthContainer = ({ children }) => {

    return (
        <>
            <section className={`d-flex justify-content-center align-items-center`} style={{ minHeight: '100vh' }}>
                <Container className={`${styles.container} mx-2`}>
                    <Row>
                        <Col lg={6} xs={12} className='px-4 py-5'>

                            <center>
                                <img src='./images/logo.png' width='180'></img>
                            </center>
                            
                            { children }
                        </Col>

                        <Col lg={6} xs={0} className={styles.loginImage}> </Col>
                    </Row>

                </Container>
            </section>
        </>
    )
}

export default NoAuthContainer