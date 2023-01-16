const WatchroomMessage = (props) => {
    return (
        <>
            {
                props.userId === props.author ?
                    <div className="d-flex flex-row justify-content-end">
                        <div>
                            <p className="bg-primary rounded p-2 mb-1 text-white" style={{ maxWidth: "320px" }}>
                                <span className="d-block fw-bold">{props.username}</span>
                                <span>{props.text}</span>
                            </p>
                        </div>
                    </div>
                    :
                    <div className="d-flex flex-row justify-content-start">
                        <div>
                            <p className="bg-light rounded p-2 mb-1" style={{ maxWidth: "320px" }}>
                                <span className="d-block fw-bold">{props.username}</span>
                                <span>{props.text}</span>
                            </p>
                        </div>
                    </div>
            }
        </>
    );
}

export default WatchroomMessage;