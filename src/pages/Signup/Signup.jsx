import FormSignup from "../../components/FormSignup/FormSignup"
import NoAuthContainer from "../../components/NoAuthContainer/NoAuthContainer"

const Signup = () => {
    return (
        <>
            <NoAuthContainer>
                <FormSignup></FormSignup>
            </NoAuthContainer>
        </>
    )
}

export default Signup