import './load.css'

const Load = () => {
    return (
        <>
            <div className='container'>
            <img src="./images/green.png" id='green' alt='mancha verde' />
            <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
            <img src="./images/pink.png" id='pink' alt='mancha rosa' />
            <img src="./images/black.png" id='black' alt='mancha preta' />
            </div >

            <center style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src='./images/loading-cat.gif' width='400' alt='loading'></img>
                <h3>Carregando...</h3>
            </center>
        </>        
    )

}

export default Load