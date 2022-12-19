const Input = ({text, value, onChange}) =>  {
    return (
        <div>
            {text} <input value={value} onChange={onChange}></input>
        </div>
    )
}

export default Input