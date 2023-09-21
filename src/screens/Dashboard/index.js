import "./index.css"


const Dashboard = () => {



    return (
        <>
            <div className="marquee-container">
                <div className="marquee-text">Welcome to <b>Nbn Payroll System!!</b></div>
            </div>
            <h1 className="tu">Dashboard</h1>

            <div class="grid-container">
                <div class="grid-item">
                    <h2>Item 1</h2>
                    <p>1</p>
                </div>
                <div class="grid-item">
                    <h2>Item 2</h2>
                    <p className="bgblue">2</p>
                </div>
                <div class="grid-item">
                    <h2 className="bgblue">Item 3</h2>
                    <p>3</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard;