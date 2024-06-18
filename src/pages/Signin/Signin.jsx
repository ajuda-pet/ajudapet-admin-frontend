import FormSignin from '../../components/FormSignin/FormSignin'
import NoAuthContainer from '../../components/NoAuthContainer/NoAuthContainer'

const Signin = () => {
    return (
        <>
            <NoAuthContainer>
                <FormSignin></FormSignin>
            </NoAuthContainer>
        </>
    )
}

export default Signin