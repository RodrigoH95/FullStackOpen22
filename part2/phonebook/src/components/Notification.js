const Notification = ({ message }) => {
    if (message === null) return null;
    let color = "black";
    if (message.includes("Success")) color = "darkgreen";
    else if (message.includes("Error")) color = "red";

    const style = {
        fontSize: 30,
        textAlign: "center",
        padding: "10px 10px",
        margin: "5px 0",
        color: color,
        border: `4px solid ${color}`,
        borderRadius: "5px",
        backgroundColor: "lightgrey"
    }
    return (
        <div style={style} className='error'>{message}</div>
    )
}

export default Notification;