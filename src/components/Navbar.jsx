import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-600 flex items-center justify-around h-10 text-white'>
            <div className="logo font-bold">
                <span className='text-green-400'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-400'>OP/&gt;</span>
                </div>
            <ul>
                <li className='flex gap-5 font-bold'>
                    <a href='/'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar