import React from 'react'
import Content from '../component/Content';
import SidebarUser from '../component/SidebarUser';
export default function Home() {
    return (
        <div className="row profile">
            <SidebarUser />
            <Content />
        </div>
    )
}
