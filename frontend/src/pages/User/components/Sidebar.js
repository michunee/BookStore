import React from 'react'
import { SidebarData } from '../data/SidebarData'
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
        <React.Fragment>
            <section>
                <div className="text-white">
                    {
                        SidebarData.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={item.path} >
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </Link>

                                </div>
                            )
                        })
                    }

                </div>
            </section>
        </React.Fragment>
    )
}

export default Sidebar