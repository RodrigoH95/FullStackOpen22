import Input from './Input'
import Button from './Button'

const PersonForm = ({inputs, button}) => {
    return (
        <>
            <form>
                {inputs.map(input => <Input key={input.text} text={input.text + ":"} value={input.value} onChange={input.onChange}/>)}
                <Button text={button.text} onClick={button.onClick} />
            </form>
        </>
    )
}

export default PersonForm